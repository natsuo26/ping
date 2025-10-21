import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { messagePacket } from '../core/models/chat.const';
import { AuthService } from '../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messageSource = new BehaviorSubject<messagePacket | null>(null);
  private userName = '';
  private roomName = '';
  message$ = this.messageSource.asObservable();
  constructor(private readonly authService: AuthService) {}

  // starts the signalR connection
  startConnection(): void {
    const token = this.authService.getAccessToken();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5254/chathub', {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build(); // replace url with your web api url running signalR socket

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messageSource.next({ user, message });
    });

    this.hubConnection
      .start()
      .then(() => console.log('signalR Connected!'))
      .catch((err) => console.error('error while starting connection: ', err));
  }

  // broadcasts the message to all rooms (maybe remove this)
  sendMessage(message: string): void {
    this.hubConnection
      .invoke('SendMessage', this.userName, message)
      .catch((err) => console.error('error while sending message: ', err));
  }

  // sends the message to the room its connected to and not to everyone outside that room
  sendMessageToRoom(message: string): void {
    this.hubConnection
      .invoke('SendMessageToRoom', message)
      .catch((err) => console.error('error while sending message: ', err));
  }

  // very important to set and register user before sending message to group else backend will not know which user name sent the message and UI will show empty username
  registerUser(): void {
    this.hubConnection
      .invoke('RegisterUser', this.userName)
      .catch((err) => console.error('error while joining room ', err));
  }

  // sets the user to the room since the map of user to room name is made via unique connectionId so sending username is not necessary.
  joinRoom(): void {
    this.hubConnection
      .invoke('JoinRoom', this.roomName)
      .catch((err) => console.error('error while joining room ', err));
  }

  // sets user name of the current client
  setUserName(userName: string): void {
    this.userName = userName;
  }

  // sets the roomName the user wants to join and communicate in
  setRoomName(roomName: string): void {
    this.roomName = roomName;
  }
}
