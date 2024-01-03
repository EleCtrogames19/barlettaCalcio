import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { DimensioneSchermoService } from '../../../service/dimensioneSchermo.service';
import { Subscription } from 'rxjs';
import { InserimentoImmaginiService } from '../../../service/inserimentoImmagini.service';
import { newsService } from '../../../service/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsAdmin',
  templateUrl: './newsAdmin.component.html',
  styleUrls: ['./newsAdmin.component.scss'],
})
export class NewsAdminComponent implements OnInit, OnDestroy, AfterViewInit {
  immagini: File[] = [];
  elementiPath: { label: string; disattiva: boolean }[] = [
    { label: 'anteprima', disattiva: true },
    { label: 'immagine', disattiva: true },
  ];
  elementiInput1: { label: string; valore: string }[] = [
    { label: 'anteprima', valore: '' },
    { label: 'immagine', valore: '' },
    { label: 'alt', valore: '' },
    { label: 'stagione', valore: '' },
  ];
  elementiInput2: { label: string; valore: string }[] = [
    { label: 'data', valore: '' },
    { label: 'titolo', valore: '' },
    { label: 'link', valore: '' },
    { label: 'url link', valore: '' },
    { label: 'descrizione', valore: '' },
  ];
  stagione: string = '';
  step2: boolean = false;
  anteprimaImmagine: { url: string; alt: string } = { url: '', alt: '' };

  subscription: Subscription[] = [];
  screenWidth: number = 0;
  screenHeight: number = 0;

  constructor(private router:Router ,private newsService: newsService, private dimensioneSchermo: DimensioneSchermoService, private inserimentoImmaginiService: InserimentoImmaginiService) {
    this.subscription.push(this.dimensioneSchermo.width.subscribe((item: number): number => (this.screenWidth = item)));
    this.subscription.push(this.dimensioneSchermo.height.subscribe((item: number): number => (this.screenHeight = item)));
  }

  ngOnInit(): void {}

  get attivaUpload(): boolean {
    return this.elementiInput1.find((elemento: { label: string; valore: string }): boolean => {
      if (elemento.label === 'stagione') {
        this.stagione = elemento.valore;
      }
      let alt: string = '';
      if (elemento.label === 'alt') {
        this.anteprimaImmagine.alt = elemento.valore;
        alt = elemento.valore;
      }
      let splistagione: string[] = this.stagione.split('-');
      return splistagione.length === 2 && splistagione[1] !== '' && alt !== '';
    })
      ? false
      : true;
  }
  ngAfterViewInit(): void {
    document.getElementById('foto')?.getElementsByTagName('input')[0].setAttribute('name', 'foto');
    document.getElementById('foto')?.getElementsByTagName('input')[0].setAttribute('method', 'post');
    document.getElementById('foto')?.getElementsByTagName('input')[0].setAttribute('enctype', 'multipart/form-data');
  }

  aggiornaDisattiva(stringa: string): void {
    if (stringa === 'stagione') {
      this.elementiPath.forEach((elementi: { label: string; disattiva: boolean }): boolean => (elementi.disattiva = false));
    }
  }

  step1Completo(): boolean {
    let esito: boolean = true;
    this.elementiInput1.forEach((elementi: { label: string; valore: string }): void => {
      if (elementi.label === 'alt') {
        this.anteprimaImmagine.alt = elementi.valore;
      }
      if (elementi.valore === '') {
        esito = false;
      }
    });

    return this.immagini.length === 2 && esito;
  }

  step2Completo(): boolean {
    let esito: boolean = true;
    this.elementiInput2.forEach((elementi: { label: string; valore: string }): void => {
      if (elementi.label !== 'link' && elementi.label !== 'url link') {
        if (elementi.valore === '') {
          esito = false;
        }
      }
    });
    return this.immagini.length === 2 && esito;
  }

  step1Event(): void {
    this.step2 = false;
  }
  step2Event(): void {
    this.step2 = true;
  }

  salva(): void {
    const parametri = Object.create({});
    this.elementiInput1.forEach((elementi) => {
      switch (elementi.label) {
        case 'immagine':
          parametri['img'] = elementi.valore;
          break;
        default:
          parametri[elementi.label] = elementi.valore;
      }
    });
    this.elementiInput2.forEach((elementi) => {
      switch (elementi.label) {
        case 'titolo':
          parametri['titoloNews'] = elementi.valore;
          break;
        case 'descrizione':
          parametri['descrizioneNews'] = elementi.valore;
          break;
        case 'link':
          parametri['linkNews'] = elementi.valore;
          break;

        case 'url link':
          parametri['urllinkNews'] = elementi.valore;
          break;

        default:
          parametri[elementi.label] = elementi.valore;
      }
    });
    this.newsService.creaNews(parametri).subscribe({
      next: () => {
      this.router.navigate(['/news'])
    }});
  }

  uploadHandler(event: { files: File[] }, tipoPath: string): void {
    let url = `assets/news/${this.stagione}/${event.files[0].name}`;
    this.inserimentoImmaginiService.postImmagineVideo(event.files[0], `news/${this.stagione}`,false).subscribe({
      next: (): void => {
        this.immagini.push(event.files[0]);
        this.elementiInput1.forEach((elementi: { label: string; valore: string }): void => {
          if (elementi.label === tipoPath) {
            elementi.valore = url;
            this.anteprimaImmagine.url = url;
          }
        });
        this.elementiPath.forEach((elementi: { label: string; disattiva: boolean }): void => {
          if (elementi.label === tipoPath) {
            elementi.disattiva = true;
          }
        });
      },
      error: () => {
        location.reload();
      },
    });
  }

  pulisciImmagini(): void {
    this.immagini = [];
    this.elementiInput1.forEach((elementi: { label: string; valore: string }): void => {
      elementi.valore = '';
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sottoscrizione: Subscription): void => sottoscrizione.unsubscribe());
  }
}
