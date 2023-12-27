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
        component: AdminComponent,
      },
      {
        path: 'video',
        component: AdminComponent,
      },
      {
        path: 'news',
        loadChildren: () => import('./newsAdmin/newsAdmin.module').then((m) => m.NewsAdminModule),
      },
      {
        path: 'news/articolo/:titolo',
        loadChildren: () => import('./../news/articolo/articolo.module').then((m) => m.ArticoloModule),
      },
      {
        path: 'messaggi',
        component: AdminComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageIntroComponent,
  },
];
