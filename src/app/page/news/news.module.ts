import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { newsRoute } from './news.routing';
import { NewsComponent } from './news.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { GalleriaDinamicaModule } from '../../components/galleria/galleriaDinamica.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    FormsModule,
    DropdownModule,
    PaginatorModule,
    ButtonModule,
    GalleriaDinamicaModule,
    RouterModule.forChild(newsRoute)
  ],
  declarations: [NewsComponent],

})
export class NewsModule { }
