import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { RouterModule } from '@angular/router';
import { homepageRoute } from './homepage.routing';
import { FormsModule } from '@angular/forms';
import { SponsorModule } from '../../components/sponsor/sponsor.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { GalleriaDinamicaModule } from '../../components/galleria/galleriaDinamica.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homepageRoute), FormsModule, SponsorModule, NavbarModule, GalleriaDinamicaModule],
  declarations: [HomepageComponent],
})
export class HomepageModule {}
