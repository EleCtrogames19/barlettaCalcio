import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DimensioneSchermoService } from './service/dimensioneSchermo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'barletta calcio';
  screenWidth: number=0;
  screenHeight: number=0;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.dimensioneSchermo.width.next(this.screenWidth);
    this.dimensioneSchermo.height.next(this.screenHeight);
  }

  constructor(private dimensioneSchermo: DimensioneSchermoService,private primengConfig: PrimeNGConfig) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }
}
