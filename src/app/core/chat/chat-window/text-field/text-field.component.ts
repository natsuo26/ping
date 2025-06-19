import { Component, output, signal } from '@angular/core';
import { ChatService } from '../../../../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  imports: [FormsModule],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent {
  message = signal('');
  user = '';
  constructor(private chatService: ChatService) {
    this.chatService.startConnection();
  }
  onSend() {
    const trimmed = this.message().trim();
    if (trimmed && this.user) {
      this.message.set('');
      this.chatService.sendMessage(this.user, trimmed);
    }
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
