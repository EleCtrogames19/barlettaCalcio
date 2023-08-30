import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { RouterModule } from '@angular/router';
import { homepageRoute } from './homepage.routing';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SponsorModule } from '../../components/sponsor/sponsor.module';
import { NavbarModule } from '../../components/navbar/navbar.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homepageRoute), GalleriaModule, FormsModule, ButtonModule, SponsorModule, NavbarModule],
  declarations: [HomepageComponent],
})
export class HomepageModule {}
