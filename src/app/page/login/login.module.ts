import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { loginRoute } from './login.routing';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(loginRoute), InputTextModule,ButtonModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
