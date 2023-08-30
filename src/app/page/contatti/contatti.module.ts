import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContattiComponent } from './contatti.component';
import { RouterModule } from '@angular/router';
import { contattiRoute } from './contatti.routing';
import { NavbarModule } from '../../components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule.forChild(contattiRoute)
  ],
  declarations: [ContattiComponent]
})
export class ContattiModule { }
