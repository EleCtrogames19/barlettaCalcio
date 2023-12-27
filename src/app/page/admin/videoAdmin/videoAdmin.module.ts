import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoAdminComponent } from './videoAdmin.component';
import { RouterModule } from '@angular/router';
import { videoAdminRoute } from './videoAdmin.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(videoAdminRoute)
  ],
  declarations: [VideoAdminComponent],
  exports:[VideoAdminComponent]
})
export class VideoAdminModule { }
