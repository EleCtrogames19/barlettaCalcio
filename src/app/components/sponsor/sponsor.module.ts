import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorComponent } from './sponsor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SponsorComponent],
  exports:[SponsorComponent]
})
export class SponsorModule { }
