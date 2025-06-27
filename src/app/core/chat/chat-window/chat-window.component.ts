import { Component, input } from '@angular/core';
import { TextFieldComponent } from './text-field/text-field.component';
import { MessageBlobComponent } from './message-blob/message-blob.component';
import { ChatService } from '../../../services/chat.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { messagePacket } from '../../models/chat.const';

@Component({
  selector: 'app-chat-window',
  imports: [TextFieldComponent, MessageBlobComponent, CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent {
  messages: messagePacket[] = [];
  constructor(private chatService: ChatService) {
    this.chatService.message$.subscribe((message) => {
      if (message) {
        this.messages.push(message);
      }
    });
  }
  shouldShowUser(index: number): boolean {
    if (index === 0) return true;
    return this.messages[index].user !== this.messages[index - 1].user;
  }
}
