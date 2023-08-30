import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PageIntroComponent } from './pageIntro.component';
import { ButtonModule} from 'primeng/button'

@NgModule({
  imports: [
    CommonModule,
    NgOptimizedImage,
    ButtonModule
  ],
  declarations: [PageIntroComponent],
  exports: [PageIntroComponent]
})
export class PageIntroModule { }
