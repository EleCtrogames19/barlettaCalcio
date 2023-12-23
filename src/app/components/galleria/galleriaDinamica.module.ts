import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaDinamicaComponent } from './galleriaDinamica.component';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  imports: [CommonModule, ButtonModule, GalleriaModule],
  declarations: [GalleriaDinamicaComponent],
  exports:[GalleriaDinamicaComponent]
})
export class GalleriaDinamicaModule {}
