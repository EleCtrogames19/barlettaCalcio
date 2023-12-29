import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessaggiAdminComponent } from './messaggiAdmin.component';
import { RouterModule } from '@angular/router';
import { messaggiAdminRoute } from './messaggiAdmin.routing';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { MessaggioModule } from '../../../components/messaggio/messaggio.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(messaggiAdminRoute),
    ButtonModule,
    PaginatorModule,
    MessaggioModule
  ],
  declarations: [MessaggiAdminComponent],
  exports:[MessaggiAdminComponent]
})
export class MessaggiAdminModule { }
