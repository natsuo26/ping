import { Component, input } from '@angular/core';

@Component({
  selector: 'app-message-blob',
  imports: [],
  templateUrl: './message-blob.component.html',
  styleUrl: './message-blob.component.scss',
})
export class MessageBlobComponent {
  message = input<string>('');
}
