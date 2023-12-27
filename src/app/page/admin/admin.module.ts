import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { adminRoute } from './admin.routing';
import { NavbarModule } from '../../components/navbar/navbar.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(adminRoute), NavbarModule],
  declarations: [AdminComponent],
  exports: [AdminComponent],
})
export class AdminModule {}
