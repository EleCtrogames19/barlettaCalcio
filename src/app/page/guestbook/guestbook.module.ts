import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestbookComponent } from './guestbook.component';
import { RouterModule } from '@angular/router';
import { guestbookRoute } from './guestbook.routing';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { MessaggioModule } from '../../components/messaggio/messaggio.module';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(guestbookRoute),
    NavbarModule,
    MessaggioModule,
    ButtonModule,
    PaginatorModule,

  ],
  declarations: [GuestbookComponent],
  exports: [GuestbookComponent],
})
export class GuestbookModule { }
