import { Component, OnInit, OnDestroy } from '@angular/core';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';
import { Subscription } from 'rxjs';
import { newsArticolo } from '../../models/interfacce';
import { Router } from '@angular/router';
import { newsService } from '../../service/news.service';

@Component({
  selector: 'app-pageIntro',
  templateUrl: './pageIntro.component.html',
  styleUrls: ['./pageIntro.component.scss'],
})
export class PageIntroComponent implements OnInit, OnDestroy {
  newsArray: newsArticolo[] = [];
  screenWidth: number = 0;
  screenHeight: number = 0;
  squadreInit2: string[][] = [];
  squadreInit1: string[][] = [];
  squadreM: string[] = [];
  subscription: Subscription[] = [];

  constructor (
    private dimensioneSchermo: DimensioneSchermoService,
    private router: Router,
    private newsService: newsService,
  ) {
    this.subscription.push(this.dimensioneSchermo.width.subscribe((item) => (this.screenWidth = item)));
    this.subscription.push(this.dimensioneSchermo.height.subscribe((item) => (this.screenHeight = item)));
  }

  ngOnInit() {
    this.caricamentoSquadre();
      this.newsService.getTotaleNews().subscribe({
        next: (response) => {
          this.newsArray = response;
        },
      });
  }

  caricamentoSquadre() {

    this.squadreInit1 = [
      ['assets/intro/squadre/asdBarletta.png', 'assets/intro/squadre/BitontoCalcio.png'],
      ['assets/intro/squadre/CasaranoCalcio.png', 'assets/intro/squadre/Cavese1919.png'],
      ['assets/intro/squadre/CittaDiFasano.png', 'assets/intro/squadre/FBCGravina.png'],
      ['assets/intro/squadre/FidelisAndria2018.png', 'assets/intro/squadre/GallipoliCalcio.png'],
      ['assets/intro/squadre/Gladiator1924.png', 'assets/intro/squadre/IschiaCalcio.png'],
    ];
    this.squadreInit2 = [
      ['assets/intro/squadre/ManfredoniaCalcio1932.png', 'assets/intro/squadre/MartinaCalcio1947.png'],
      ['assets/intro/squadre/Matera.png', 'assets/intro/squadre/MolfettaCalcio.png'],
      ['assets/intro/squadre/Nardò.png', 'assets/intro/squadre/NocerinaCalcio1910.png'],
      ['assets/intro/squadre/RealCasalnuovo.png', 'assets/intro/squadre/RotondaCalcio.png'],
      ['assets/intro/squadre/SanMarzanoCalcio.png', 'assets/intro/squadre/TeamAltamura.png'],
    ];
  }

  navigate() {
    this.router.navigate(['/homepage']);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((item) => item.unsubscribe());
  }
}
