import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticoloComponent } from './articolo.component';
import { RouterModule } from '@angular/router';
import { articoloRoute } from './articolo.routing';
import { NavbarModule } from '../../../components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule.forChild(articoloRoute)
  ],
  declarations: [ArticoloComponent]
})
export class ArticoloModule { }
