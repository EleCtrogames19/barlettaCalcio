import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { PageIntroComponent } from './page/pageIntro/pageIntro.component';

const routes: Routes = [
  {
    path: '',
    component: PageIntroComponent,
  },
  {
    path: 'homepage',
    loadChildren: () => import('./page/homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {
    path: 'calendario',
    loadChildren: () => import('./page/calendario/calendario.module').then((m) => m.CalendarioModule),
  },
  {
    path: 'contatti',
    loadChildren: () => import('./page/contatti/contatti.module').then((m) => m.ContattiModule),
  },
  {
    path: 'news',
    loadChildren: () => import('./page/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'news/articolo/:titolo',
    loadChildren: () => import('./page/news/articolo/articolo.module').then((m) => m.ArticoloModule),
  },
  {
    path: '**',
    component: PageIntroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
