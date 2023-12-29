import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Location} from '@angular/common';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credenziali: FormGroup = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){3,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$')])),
  });

  constructor(private dimensioneSchermoService: DimensioneSchermoService, private router: Router, private loginService: LoginService, private location: Location) {}
  ngOnInit(): void {}

  guest(): void {
    this.location.back();
  }
  login(): void {
    this.loginService.getLogin(this.credenziali.value).subscribe({
      next: (login): void => {
        sessionStorage.setItem('a', 'barlettaCalcio')
        this.router.navigate(['amministratore']);
      },
      error: (errore: HttpErrorResponse): void => console.log('errore', errore),
    });
  }
}
