import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy, AfterContentChecked {
  isHome: boolean = true;
  screenWidth: number = 0;
  screenHeight: number = 0;

  subscription: Subscription[] = [];

  constructor(private router: Router, private dimensioneSchermo: DimensioneSchermoService) {
    this.subscription.push(this.dimensioneSchermo.width.subscribe((item: number): number => (this.screenWidth = item)));
    this.subscription.push(this.dimensioneSchermo.height.subscribe((item: number): number => (this.screenHeight = item)));
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
        const url: string[] = this.router.url.split('/');
        this.isHome = url[url.length - 1] === 'amministratore' ? true : false;
  }

  navigazione(percorso: string): void {
    this.router.navigate(['amministratore/' + percorso]);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sottoscrizione: Subscription) => {
      sottoscrizione.unsubscribe();
    });
  }
}
