import { Component, input } from '@angular/core';
import { TextFieldComponent } from './text-field/text-field.component';
import { MessageBlobComponent } from './message-blob/message-blob.component';

@Component({
  selector: 'app-chat-window',
  imports: [TextFieldComponent, MessageBlobComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent {
  messages = input<string[]>(['hello', 'hi', 'wassup']);
  public handleSend(event: string) {
    if (event) {
      this.messages().push(event);
    }
  }
}
