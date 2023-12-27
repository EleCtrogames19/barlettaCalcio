import { Component, OnInit } from '@angular/core';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  width: number = 0;
  sidebarVisible: boolean = false;
  loggato: boolean = false;

  constructor(private dimensioneSchermoService: DimensioneSchermoService, private router: Router) {}

  ngOnInit(): void {
    this.dimensioneSchermoService.width.subscribe((item: number): number => (this.width = item));
    this.dimensioneSchermoService.isLoggato.subscribe((loggato: boolean): boolean => (this.loggato = loggato));
    setInterval(() => {
       this.dimensioneSchermoService.isLoggato.next(sessionStorage.getItem('a') === 'barlettaCalcio');
     }, 1000);
  }
  login(): void {
    if (this.loggato) {
      this.router.navigate(['amministratore']);
    } else {
      this.router.navigate(['login']);
    }
  }

}
