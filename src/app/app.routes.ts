import { Routes } from '@angular/router';
import { ChatLayoutComponent } from './core/chat-layout/chat-layout.component';
import { JoinRoomComponent } from './core/join-room/join-room.component';

export const routes: Routes = [
  { path: '', component: JoinRoomComponent },
  { path: 'chat', component: ChatLayoutComponent },
];
