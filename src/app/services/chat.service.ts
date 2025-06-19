import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { messagePacket } from '../core/models/chat.const';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messageSource = new BehaviorSubject<messagePacket | null>(null);
  message$ = this.messageSource.asObservable();

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5019/chathub')
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

  sendMessage(user: string, message: string): void {
    this.hubConnection
      .invoke('SendMessage', user, message)
      .catch((err) => console.error('error while sending message: ', err));
  }
}
