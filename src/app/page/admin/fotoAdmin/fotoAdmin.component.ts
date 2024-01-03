import { Component, OnInit, Input as InputRouter, OnDestroy, AfterViewInit } from '@angular/core';
import { DimensioneSchermoService } from '../../../service/dimensioneSchermo.service';
import { Subscription } from 'rxjs';
import { InserimentoImmaginiService } from '../../../service/inserimentoImmagini.service';
import { ArchivioService } from '../../../service/archivio.service';
import { Immagine, Video } from '../../../models/interfacce';

@Component({
  selector: 'app-fotoAdmin',
  templateUrl: './fotoAdmin.component.html',
  styleUrls: ['./fotoAdmin.component.scss'],
})
export class FotoAdminComponent implements OnInit, OnDestroy, AfterViewInit {
  @InputRouter() video: boolean = false;
  immagini: File[] = [];
  elementiPath1: { label: string; disattiva: boolean }[] = [
    { label: 'anteprima', disattiva: true },
    { label: 'immagine', disattiva: true },
  ];
  elementiPath2: { label: string; disattiva: boolean }[] = [{ label: 'video', disattiva: true }];
  elementiInput1: { label: string; valore: string }[] = [
    { label: 'anteprima', valore: '' },
    { label: 'immagine', valore: '' },
    { label: 'alt', valore: '' },
    { label: 'stagione', valore: '' },
    { label: 'titolo', valore: '' },
  ];
  elementiInput2: { label: string; valore: string }[] = [
    { label: 'video', valore: '' },
    { label: 'stagione', valore: '' },
  ];
  stagione: string = '';
  anteprimaImmagine: { url: string; alt: string } = { url: '', alt: '' };
  subscription: Subscription[] = [];
  screenWidth: number = 0;
  screenHeight: number = 0;
  constructor(private archivioService: ArchivioService, private inserimentoImmaginiService: InserimentoImmaginiService, private dimensioneSchermo: DimensioneSchermoService) {
    this.subscription.push(this.dimensioneSchermo.width.subscribe((item: number): number => (this.screenWidth = item)));
    this.subscription.push(this.dimensioneSchermo.height.subscribe((item: number): number => (this.screenHeight = item)));
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    document.getElementById('foto')?.getElementsByTagName('input')[0].setAttribute('name', 'foto');
    document.getElementById('foto')?.getElementsByTagName('input')[0].setAttribute('method', 'post');
    document.getElementById('foto')?.getElementsByTagName('input')[0].setAttribute('enctype', 'multipart/form-data');
  }

  aggiornaDisattiva(stringa: string): void {
    if (this.video) {
      if (stringa === 'stagione') {
        this.elementiPath2.forEach((elementi: { label: string; disattiva: boolean; }): boolean => (elementi.disattiva = false));
      }
       } else {
      if (stringa === 'stagione') {
        this.elementiPath1.forEach((elementi: { label: string; disattiva: boolean }): boolean => (elementi.disattiva = false));
      }
    }
  }
  get disattivaSalva(): boolean {
    let disattiva: boolean = false;
    if (this.video) {
    this.elementiInput2.forEach((elementi: { label: string; valore: string }): void => {
      if (elementi.valore === '') {
        disattiva = true;
      }
    });
    } else {
      this.elementiInput1.forEach((elementi: { label: string; valore: string; }): void => {
        if (elementi.valore === '') {
          disattiva = true;
        }
      });
    }
    return disattiva;
  }
  get attivaUpload(): boolean {
    let titolo: string = '';
    let alt: string = '';
    return this.elementiInput1.find((elemento: { label: string; valore: string }): boolean => {
      if (elemento.label === 'stagione') {
        this.stagione = elemento.valore;
      }
      if (elemento.label === 'alt') {
        this.anteprimaImmagine.alt = elemento.valore;
        alt = elemento.valore;
      }
      if (elemento.label === 'titolo') {
        titolo = elemento.valore;
      }
      let splistagione: string[] = this.stagione.split('-');
      if (this.video) {
        return splistagione.length === 1 && splistagione[1] !== '';
      } else {
        return splistagione.length === 2 && splistagione[1] !== '' && alt !== '' && titolo !== '';
      }
    })
      ? false
      : true;
  }
  uploadHandler(event: { files: File[] }, tipoPath: string): void {
    console.log(event)
    let url = `assets/galleria/${this.stagione}/${event.files[0].name}`;
    this.inserimentoImmaginiService.postImmagineVideo(event.files[0], `galleria/${this.stagione}`,this.video).subscribe({
      next: (): void => {
        this.immagini.push(event.files[0]);
        this.elementiInput1.forEach((elementi: { label: string; valore: string }): void => {
          if (elementi.label === tipoPath) {
            elementi.valore = url;
            this.anteprimaImmagine.url = url;
          }
        });
        this.elementiInput2.forEach((elementi: { label: string; valore: string }): void => {
          if (elementi.label === tipoPath) {
            elementi.valore = url;
            this.anteprimaImmagine.url = url;
          }
        });
        if (this.video) {
          this.elementiPath2.forEach((elementi: { label: string; disattiva: boolean }): void => {
            if (elementi.label === tipoPath) {
              elementi.disattiva = true;
            }
          });
        } else {
          this.elementiPath1.forEach((elementi: { label: string; disattiva: boolean }): void => {
            if (elementi.label === tipoPath) {
              elementi.disattiva = true;
            }
          });
        }
      },
      error: (errore): void => {
        console.log('errore', errore)
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

  salva(): void {
    if (!this.video) {
      let foto: Immagine = {
        itemImageSrc: '',
        thumbnailImageSrc: '',
        alt: '',
        stagione: '',
        title: '',
      };

      this.elementiInput1.forEach((elementi: { label: string; valore: string }) => {
        switch (elementi.label) {
          case 'anteprima':
            foto['thumbnailImageSrc'] = elementi.valore;
            break;
          case 'immagine':
            foto['itemImageSrc'] = elementi.valore;

            break;
          case 'alt':
            foto['alt'] = elementi.valore;

            break;
          case 'stagione':
            foto['stagione'] = elementi.valore;

            break;
          case 'titolo':
            foto['title'] = elementi.valore;

            break;
        }
      });
      this.archivioService.postFoto(foto).subscribe({
        next: () => {},
        error: () => {},
      });
    } else {
      let video: Video = {
        itemVideoSrc: '',
        type: 'video/mp4',
        stagione: '',
      };
      this.elementiInput2.forEach((elemento: { label: string; valore: string; }) => {
        switch (elemento.label) {
          case 'video':
            video['itemVideoSrc'] = elemento.valore;
            break;
          case 'stagione':
            video['stagione'] = elemento.valore;
            break;

          default:
            break;
        }
      });
      this.archivioService.postVideo(video).subscribe({
        next: () => {},
        error: () => {},
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sottoscrizione: Subscription): void => sottoscrizione.unsubscribe());
  }
}
