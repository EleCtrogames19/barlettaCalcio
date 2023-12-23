import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { datiUtente } from '../../models/interfacce';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messaggio',
  templateUrl: './messaggio.component.html',
  styleUrls: ['./messaggio.component.scss'],
})
export class MessaggioComponent implements OnInit, OnDestroy {
  @Input() citazione: { nomeCitazione: string; citazione: string } | undefined;
  @Output() invioNuovaNews: EventEmitter<{ datiUtente: datiUtente[]; messaggio: string; citazione: { nomeCitazione: string; citazione: string } | undefined }> = new EventEmitter<{ datiUtente: datiUtente[]; messaggio: string; citazione: { nomeCitazione: string; citazione: string } | undefined }>();
  elementiMessaggio: datiUtente[] = [
    {
      label: 'Nome*',
      valore: '',
      placeholder: 'inserisci il tuo nome',
    },
    {
      label: 'Email',
      valore: '',
      placeholder: 'esempio@esempio.it',
    },
    {
      label: 'Sito',
      valore: '',
      placeholder: 'https://www.prova.it',
    },
    {
      label: 'Residenza',
      valore: '',
      placeholder: 'inserisci la tua residenza',
    },
  ];
  valoreMessaggio: string = '';
  isEmojiPickerVisible: boolean = false;

  width: number = 0;

  step2: boolean = false;

  sottoscrizioni: Subscription[] = [];

  constructor(private dimensioniSchermoService: DimensioneSchermoService) {}

  ngOnInit(): void {
    this.sottoscrizioni.push(this.dimensioniSchermoService.width.subscribe((width: number) => (this.width = width)));
  }

  addEmoji(event: any): void {
    console.log('event.emoji.native', event.emoji.unified);
    this.valoreMessaggio = `${this.valoreMessaggio}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  salvaNews(): void {
    console.log('elementiMessaggio', this.elementiMessaggio);
    console.log('elementiMessaggio', this.valoreMessaggio);
    this.invioNuovaNews.emit({ datiUtente: this.elementiMessaggio, messaggio: this.valoreMessaggio, citazione: this.citazione });
  }
  annullaNews(): void {
    this.invioNuovaNews.emit();
  }
  cambioStep(): void {
    this.step2 = true;
  }
  tornoStepPrecedente(): void {
    this.step2 = false;
  }
  get disabilitaStep1(): boolean {
    const risultato: datiUtente[] = this.elementiMessaggio.filter((items: datiUtente): boolean =>items.valore==='');
    console.log('risultato', risultato);
    return risultato.length>0
  }

  get disabilitaStep2(): boolean{
    return this.valoreMessaggio === '';
  }
  ngOnDestroy(): void {
    this.sottoscrizioni.forEach((item) => item.unsubscribe());
  }
}
