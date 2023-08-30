import { Component, OnInit } from '@angular/core';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  width: number = 0;
  sidebarVisible: boolean = false;

  constructor(private dimensioneSchermoService: DimensioneSchermoService) {}

  ngOnInit() {
    this.dimensioneSchermoService.width.subscribe((item) => (this.width = item));
  }
}
