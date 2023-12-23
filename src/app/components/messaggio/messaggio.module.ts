import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessaggioComponent } from './messaggio.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ButtonModule } from 'primeng/button';


@NgModule({
  imports: [CommonModule, InputTextModule, InputTextareaModule, FormsModule, PickerModule, ButtonModule],
  declarations: [MessaggioComponent],
  exports: [MessaggioComponent],
})
export class MessaggioModule {}
