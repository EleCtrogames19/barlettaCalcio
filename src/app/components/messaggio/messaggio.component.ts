import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { datiUtente, messaggioUtente } from '../../models/interfacce';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messaggio',
  templateUrl: './messaggio.component.html',
  styleUrls: ['./messaggio.component.scss'],
})
export class MessaggioComponent implements OnInit, OnDestroy {
  @Input() citazione: { nomeCitazione: string; citazione: string } | undefined;
  @Input() messaggiApprovare: messaggioUtente | undefined;
  @Input() indiceMessaggio: number = -1;
  @Output() invioNuovaNews: EventEmitter<{ datiUtente: datiUtente[]; messaggio: string; citazione: { nomeCitazione: string; citazione: string } | undefined }> = new EventEmitter<{ datiUtente: datiUtente[]; messaggio: string; citazione: { nomeCitazione: string; citazione: string } | undefined }>();
  @Output() cancellaMessaggio: EventEmitter<string> = new EventEmitter<string>();
  elementiMessaggio: datiUtente[] = [
    {
      label: 'Nome*',
      valore: '',
      placeholder: 'inserisci il tuo nome',
      disabilita: false,
    },
    {
      label: 'Email',
      valore: '',
      placeholder: 'esempio@esempio.it',
      disabilita: false,
    },
    {
      label: 'Sito',
      valore: '',
      placeholder: 'https://www.prova.it',
      disabilita: false,
    },
    {
      label: 'Residenza',
      valore: '',
      placeholder: 'inserisci la tua residenza',
      disabilita: false,
    },
    {
      label: 'Data',
      valore: '',
      placeholder: '',
      disabilita: false,
    },
  ];
  valoreMessaggio: string = '';
  isEmojiPickerVisible: boolean = false;

  width: number = 0;

  step2: boolean = false;

  nome: string = '';

  sottoscrizioni: Subscription[] = [];

  constructor(private dimensioniSchermoService: DimensioneSchermoService) {}

  ngOnInit(): void {
    this.sottoscrizioni.push(this.dimensioniSchermoService.width.subscribe((width: number): number => (this.width = width)));
    if (this.messaggiApprovare) {
      if (this.messaggiApprovare.citazione) {
        this.citazione = {
          nomeCitazione: this.messaggiApprovare.nomeCitazione,
          citazione: this.messaggiApprovare.citazione,
        };
      }
      this.elementiMessaggio.forEach((elemento: datiUtente): void => {
        switch (elemento.label) {
          case 'Nome*':
            elemento.valore = this.messaggiApprovare?.nome || '';
            elemento.disabilita = true;
            this.nome = this.messaggiApprovare?.nome || '';
            break;
          case 'Email':
            elemento.valore = this.messaggiApprovare?.email || '';
            elemento.disabilita = true;
            break;
          case 'Sito':
            elemento.valore = this.messaggiApprovare?.sito || '';
            elemento.disabilita = true;
            break;
          case 'Residenza':
            elemento.valore = this.messaggiApprovare?.residenza || '';
            elemento.disabilita = true;
            break;
          case 'Data':
            elemento.valore = this.messaggiApprovare?.dataInserimento || '';
            elemento.disabilita = true;
            break;
          default:
            break;
        }
      });
      this.valoreMessaggio = this.messaggiApprovare.messaggio;
    }
  }

  addEmoji(event: any): void {
    this.valoreMessaggio = `${this.valoreMessaggio}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  salvaNews(): void {
    this.elementiMessaggio.unshift({
      label: 'idconferma_messaggi',
      valore: this.messaggiApprovare?.idconferma_messaggi || '',
      placeholder: '',
      disabilita: false,
    });
    this.invioNuovaNews.emit({ datiUtente: this.elementiMessaggio, messaggio: this.valoreMessaggio, citazione: this.citazione });
  }
  annullaNews(): void {
    this.invioNuovaNews.emit();
    this.cancellaMessaggio.emit(this.messaggiApprovare?.idconferma_messaggi || '');
  }
  cambioStep(): void {
    this.step2 = true;
  }
  tornoStepPrecedente(): void {
    this.step2 = false;
  }
  get disabilitaStep1(): boolean {
    const risultato: datiUtente | undefined = this.elementiMessaggio.find((items: datiUtente): boolean => items.label === 'Nome*' && items.valore === '');
    return risultato !== undefined || this.indiceMessaggio > 0;
  }

  get disabilitaStep2(): boolean {
    return this.valoreMessaggio === '';
  }
  ngOnDestroy(): void {
    this.sottoscrizioni.forEach((item: Subscription): void => item.unsubscribe());
  }
}
