import { Component, signal } from '@angular/core';
import { ChatService } from '../../../../../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  imports: [FormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent {
  message = signal('');
  constructor(private chatService: ChatService) {}
  onSend() {
    const trimmed = this.message().trim();
    this.message.set('');
    this.chatService.sendMessageToRoom(trimmed);
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
