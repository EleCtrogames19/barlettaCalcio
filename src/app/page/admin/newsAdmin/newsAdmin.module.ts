import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsAdminComponent } from './newsAdmin.component';
import { RouterModule } from '@angular/router';
import { newsAdminRoute } from './newsAdmin.routing';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(newsAdminRoute),
    TooltipModule,
    FormsModule,
    InputTextModule,
    FileUploadModule,
    InputTextareaModule
  ],
  declarations: [NewsAdminComponent],
  exports: [NewsAdminComponent],
})
export class NewsAdminModule {}
