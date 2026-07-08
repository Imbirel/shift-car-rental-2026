import { Routes } from '@angular/router';
import { ProfilePage } from '@features/profile/pages/profile-page/profile-page';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    title: 'My Profile',
    component: ProfilePage,
  },
];
