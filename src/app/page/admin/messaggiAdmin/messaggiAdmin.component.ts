import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { datiUtente, messaggioUtente } from '../../../models/interfacce';
import { MessageService } from '../../../service/messaggio.service';

@Component({
  selector: 'app-messaggiAdmin',
  templateUrl: './messaggiAdmin.component.html',
  styleUrls: ['./messaggiAdmin.component.scss'],
})
export class MessaggiAdminComponent implements OnInit {
  first: number = 0;
  rows: number = 10;
  limitePagina: number = 10;
  totalRecords: number = 0;
  messaggi: messaggioUtente[] = [];

  constructor(private messaggioService: MessageService) {
    this.messaggioService.getConfermaTotaleRighe().subscribe({
      next: (totaleRighe: { totaleRighe: number }[]): void => {
        this.totalRecords = totaleRighe[0].totaleRighe;
      },
      error: (errore: HttpErrorResponse): void => console.log('errore', errore),
    });
  }

  ngOnInit(): void {
    this.getMessaggi();
  }

  getMessaggi() {
    this.messaggioService.getConfermaMessaggio(this.first, this.rows, this.limitePagina).subscribe({
      next: (messaggi: messaggioUtente[]): void => {
        this.messaggi = [...messaggi];
        // this.messaggi.reverse();
      },
      error: (errore: HttpErrorResponse): void => console.log('errore', errore),
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.limitePagina = event.rows;
    this.rows = 9 + event.page * this.limitePagina;
    this.getMessaggi();
  }

  nuovaNewsService(event: { datiUtente: datiUtente[]; messaggio: string; citazione: { nomeCitazione: string; citazione: string } | undefined }): void {
    if (event) {
      let messaggio: messaggioUtente = {
        idconferma_messaggi: '',
        nome: '',
        dataInserimento: '',
        messaggio: '',
        nomeCitazione: '',
        citazione: '',
        email: '',
        sito: '',
        residenza: '',
        accettato: 'true',
      };
      event.datiUtente.forEach((elemento: datiUtente): void => {
        switch (elemento.label) {
          case 'idconferma_messaggi':
            messaggio['idconferma_messaggi'] = elemento.valore;
            break;
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
          case 'Data':
            messaggio['dataInserimento'] = elemento.valore;
            break;
          default:
            break;
        }
      });
      messaggio['messaggio'] = event.messaggio;
      messaggio['citazione'] = event.citazione?.citazione || '';
      messaggio['nomeCitazione'] = event.citazione?.nomeCitazione || '';
      this.messaggioService.postMessaggio(messaggio).subscribe({
        next: (): void => {
          this.getMessaggi();
        },
        error: (errore: HttpErrorResponse): void => console.log('errore', errore),
      });
    }
  }

  cancellaMessaggio(id: string): void {
    this.messaggioService.cancellaMessaggio(id).subscribe({
   next: (): void => {
     this.getMessaggi();
   },
   error: (errore: HttpErrorResponse): void => console.log('errore', errore),
 });
  };
}
