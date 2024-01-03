export interface Immagine {
  id?: string;
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  stagione?:string;
  title: string;
}
export interface Video {
  id?: string;
  itemVideoSrc: string;
  type: string;
  stagione?: string;
}

export interface Sponsor {
  src: string;
}

export interface newsArticolo {
  id: number;
  stagione: string;
  img: string;
  anteprima: string;
  alt: string;
  data: string;
  titoloNews: string;
  descrizioneNews: string;
  linkNews: boolean;
  urllinkNews: string;
}

export interface datiUtente {
  label: string;
  valore: string;
  placeholder: string;
  disabilita: boolean;
}

export interface messaggioUtente {
  idconferma_messaggi?: string;
  idmessaggio?: string;
  nome: string;
  dataInserimento: string;
  messaggio: string;
  nomeCitazione: string;
  citazione: string;
  email: string;
  sito: string;
  residenza: string;
  accettato: string;
}

export interface elementiDialogo{
  visible: boolean;
  header: string;
  messagge: string;
  button: string[];
 }
