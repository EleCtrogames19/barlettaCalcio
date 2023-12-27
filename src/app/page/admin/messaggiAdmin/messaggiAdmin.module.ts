import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessaggiAdminComponent } from './messaggiAdmin.component';
import { RouterModule } from '@angular/router';
import { messaggiAdminRoute } from './messaggiAdmin.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(messaggiAdminRoute)
  ],
  declarations: [MessaggiAdminComponent],
  exports:[MessaggiAdminComponent]
})
export class MessaggiAdminModule { }
