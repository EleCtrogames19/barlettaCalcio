import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario.component';
import { RouterModule } from '@angular/router';
import { calendarioRoute } from './homepage.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(calendarioRoute)
  ],
  declarations: [CalendarioComponent],
})
export class CalendarioModule {}
