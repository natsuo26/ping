import { Routes } from '@angular/router';
import { ChatLayoutComponent } from './core/components/chat-layout/chat-layout.component';
import { JoinRoomComponent } from './core/components/join-room/join-room.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', component: JoinRoomComponent, canActivate: [authGuard] },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/components/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [guestGuard],
  },
  { path: 'chat', component: ChatLayoutComponent, canActivate: [authGuard] },
];
