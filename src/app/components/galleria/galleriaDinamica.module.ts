import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaDinamicaComponent } from './galleriaDinamica.component';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { SponsorModule } from '../sponsor/sponsor.module';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [CommonModule, ButtonModule, GalleriaModule, SponsorModule, PaginatorModule],
  declarations: [GalleriaDinamicaComponent],
  exports:[GalleriaDinamicaComponent]
})
export class GalleriaDinamicaModule {}
