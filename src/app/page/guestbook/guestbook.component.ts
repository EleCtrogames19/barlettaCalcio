import { Component, OnInit } from '@angular/core';
import { datiUtente, messaggioUtente } from '../../models/interfacce';
import { MessageService } from '../../service/messaggio.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html',
  styleUrls: ['./guestbook.component.scss'],
})
export class GuestbookComponent implements OnInit {
  nuovaNews: boolean = false;
  messaggi: messaggioUtente[] = [];
  citazione: { nomeCitazione: string; citazione: string } | undefined = undefined;
  first: number = 0;
  rows: number = 10;
  limitePagina: number = 10;
  totalRecords: number = 0;

  constructor(private messaggioService: MessageService) {
    this.messaggioService.getTotaleRighe().subscribe({
      next: (totaleRighe: { totaleRighe: number }[]): void => {
        this.totalRecords = totaleRighe[0].totaleRighe;
      },
      error: (errore: HttpErrorResponse): void => console.log('errore', errore),
    });
  }

  ngOnInit(): void {
    this.getMessaggi();
  }
  attivaDialogoNuovaNews(attivaDisattiva: boolean, citazione: { nomeCitazione: string; citazione: string } | undefined): void {
    this.nuovaNews = attivaDisattiva;
    if (citazione) {
      this.citazione = citazione;
    }
  }
  nuovaNewsService(event: { datiUtente: datiUtente[]; messaggio: string; citazione: { nomeCitazione: string; citazione: string } | undefined }): void {
    if (event) {
      let messaggio: messaggioUtente = {
        nome: '',
        dataInserimento: '',
        messaggio: '',
        nomeCitazione: '',
        citazione: '',
        email: '',
        sito: '',
        residenza: '',
        accettato: 'false',
      };
      console.log(event);
      event.datiUtente.forEach((elemento: datiUtente): void => {
        switch (elemento.label) {
          case 'Nome*':
            messaggio['nome'] = elemento.valore;
            break;
          case 'Email':
            messaggio['email'] = elemento.valore;
            break;
          case 'nomeCitazione':
            messaggio['nomeCitazione'] = elemento.valore;
            break;
          case 'Residenza':
            messaggio['residenza'] = elemento.valore;
            break;
          case 'Sito':
            messaggio['sito'] = elemento.valore;
            break;
          default:
            break;
        }
      });
      messaggio['messaggio'] = event.messaggio;
      messaggio['dataInserimento'] = new Date().toLocaleString('IT-it').replace(',', '');
      messaggio['citazione'] = event.citazione?.citazione || '';
      messaggio['nomeCitazione'] = event.citazione?.nomeCitazione || '';
      this.messaggioService.postMessaggio(messaggio).subscribe({
        next: (): void => {
          this.getMessaggi();
        },
        error: (errore: HttpErrorResponse): void => console.log('errore', errore),
      });
    }
    this.attivaDialogoNuovaNews(false, undefined);
  }
  onPageChange(event: any): void {
    console.log('evet', event);
    this.first = event.first;
    this.limitePagina = event.rows;
    this.rows = 9 + event.page * this.limitePagina;
    this.getMessaggi();
  }

  getMessaggi() {
    this.messaggioService.getMessaggio(this.first, this.rows, this.limitePagina).subscribe({
      next: (messaggi: messaggioUtente[]): void => {
        this.messaggi = [...messaggi];
        // this.messaggi.reverse();
      },
      error: (errore: HttpErrorResponse): void => console.log('errore', errore),
    });
  }
}
