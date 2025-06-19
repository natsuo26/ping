import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-text-field',
  imports: [],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent {
  message = signal('');
  sendMessage = output<string>();

  onSend() {
    const trimmed = this.message().trim();
    if (trimmed) {
      this.sendMessage.emit(trimmed);
      this.message.set('');
    }
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
