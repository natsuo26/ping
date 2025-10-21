import { Component } from '@angular/core';
import { ChatWindowComponent } from './chat-window/chat-window.component';

@Component({
  selector: 'app-chat',
  imports: [ChatWindowComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {}
