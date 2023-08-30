import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticoloComponent } from './articolo.component';
import { RouterModule } from '@angular/router';
import { articoloRoute } from './articolo.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(articoloRoute)
  ],
  declarations: [ArticoloComponent]
})
export class ArticoloModule { }
