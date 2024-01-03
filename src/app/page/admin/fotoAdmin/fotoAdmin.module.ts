import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoAdminComponent } from './fotoAdmin.component';
import { RouterModule } from '@angular/router';
import { fotoAdminRoute } from './fotoAdmin.routing';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(fotoAdminRoute),
    ButtonModule,
    FileUploadModule,
    FormsModule,
    InputTextModule
  ],
  declarations: [FotoAdminComponent],
  exports:[FotoAdminComponent]
})
export class FotoAdminModule { }
