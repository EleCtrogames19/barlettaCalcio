import { Component, OnInit, OnDestroy } from '@angular/core';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';
import { Subscription } from 'rxjs';
import { newsArticolo } from '../../models/interfacce';

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

  constructor(private dimensioneSchermo: DimensioneSchermoService) {
    this.subscription.push(this.dimensioneSchermo.width.subscribe((item) => (this.screenWidth = item)));
    this.subscription.push(this.dimensioneSchermo.height.subscribe((item) => (this.screenHeight = item)));
  }

  ngOnInit() {
    this.caricamentoSquadre();
    this.newsArray = [
      {
        id: 0,
        stagione: '2023-2024',
        img: '../../../assets/intro/1111.jpg',
        anteprima: '../../../assets/intro/1111.jpg',
        alt: 'immagine barletta',
        data: '12 gennaio 2023',
        titoloNews: '18^ g.Barletta - Molfetta 1-1',
        descrizioneNews: 'Finale al "Manzi-Chiapulin", 1-1 tra Barletta e Molfetta',
        linkNews: true,
        urllinkNews: '/',
      },
      {
        id: 1,
        stagione: '2023-2024',
        img: '../../../assets/intro/1111.jpg',
        anteprima: '../../../assets/intro/1111.jpg',
        alt: 'immagine barletta',
        data: '12 gennaio 2023',
        titoloNews: '18^ g.Barletta - Molfetta 1-1',
        descrizioneNews: 'Finale al "Manzi-Chiapulin", 1-1 tra Barletta e Molfetta',
        linkNews: false,
        urllinkNews: '/',
      },
      {
        id: 2,
        stagione: '2023-2024',
        img: '../../../assets/intro/1111.jpg',
        anteprima: '../../../assets/intro/1111.jpg',
        alt: 'immagine barletta',
        data: '12 gennaio 2023',
        titoloNews: '18^ g.Barletta - Molfetta 1-1',
        descrizioneNews: 'Finale al "Manzi-Chiapulin", 1-1 tra Barletta e Molfetta',
        linkNews: true,
        urllinkNews: '/',
      },
    ];
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
  ngOnDestroy(): void {
    this.subscription.forEach((item) => item.unsubscribe());
  }
}
