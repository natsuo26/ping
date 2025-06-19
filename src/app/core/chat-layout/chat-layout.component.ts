import { Component } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-chat-layout',
  imports: [ChatListComponent, ChatComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent {}
