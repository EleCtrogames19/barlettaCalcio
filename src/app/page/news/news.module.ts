import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { newsRoute } from './news.routing';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule.forChild(newsRoute)
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
