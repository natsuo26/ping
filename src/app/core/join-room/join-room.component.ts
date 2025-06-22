import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-join-room',
  imports: [FormsModule],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.scss',
})
export class JoinRoomComponent {
  userName = '';
  roomName = '';
  constructor(private router: Router, private chatService: ChatService) {
    this.chatService.startConnection();
  }

  public onJoinClicked(): void {
    this.chatService.setUserName(this.userName);
    this.chatService.setRoomName(this.roomName);
    this.chatService.joinRoom();
    this.chatService.registerUser();
    this.router.navigateByUrl('chat');
  }
}
