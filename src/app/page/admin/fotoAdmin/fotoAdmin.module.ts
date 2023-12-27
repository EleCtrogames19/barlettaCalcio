import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoAdminComponent } from './fotoAdmin.component';
import { RouterModule } from '@angular/router';
import { fotoAdminRoute } from './fotoAdmin.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(fotoAdminRoute)
  ],
  declarations: [FotoAdminComponent],
  exports:[FotoAdminComponent]
})
export class FotoAdminModule { }
