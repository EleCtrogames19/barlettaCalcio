import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PageIntroComponent } from '../pageIntro/pageIntro.component';

export const adminRoute: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'foto',
        loadChildren: () => import('./fotoAdmin/fotoAdmin.module').then((m) => m.FotoAdminModule),
      },
      {
        path: 'video',
        loadChildren: () => import('./videoAdmin/videoAdmin.module').then((m) => m.VideoAdminModule),
      },
      {
        path: 'news',
        loadChildren: () => import('./newsAdmin/newsAdmin.module').then((m) => m.NewsAdminModule),
      },
      {
        path: 'messaggi',
        loadChildren: () => import('./messaggiAdmin/messaggiAdmin.module').then((m) => m.MessaggiAdminModule),
      },
    ],
  },
  {
    path: '**',
    component: PageIntroComponent,
  },
];
