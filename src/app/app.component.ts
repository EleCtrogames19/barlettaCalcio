import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DimensioneSchermoService } from './service/dimensioneSchermo.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { elementiDialogo } from './models/interfacce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'barletta calcio';
  screenWidth: number = 0;
  screenHeight: number = 0;
  loading$: Observable<boolean> = this.dimensioneSchermo.loading$;
  mostraSpinner: boolean = false;
  visible: boolean = true;
  elementiDialog: BehaviorSubject<elementiDialogo>|undefined;
  header: string='';
  messaggio: string='';
  button: string[]=[];

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.dimensioneSchermo.width.next(this.screenWidth);
    this.dimensioneSchermo.height.next(this.screenHeight);
  }

  constructor(private dimensioneSchermo: DimensioneSchermoService, private primengConfig: PrimeNGConfig) {
    this.getScreenSize();
    this.dimensioneSchermo.loading$.subscribe((spinner: boolean): void => {
      this.mostraSpinner = spinner;
    });
    this.dimensioneSchermo.elementiDialogo.subscribe((elementi: elementiDialogo) => {
      this.visible = elementi.visible;
      this.header = elementi.header;
      this.messaggio = elementi.messagge;
      this.button = elementi.button;
    })
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }

  chiudi() {
    this.dimensioneSchermo.elementiDialogo.next({
      visible: false,
      header: '',
      messagge: "",
      button: [],
    });
  }
}
