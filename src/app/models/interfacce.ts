export interface Immagine {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

export interface Sponsor
{
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
  urllinkNews: '/';
}
