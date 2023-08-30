import { Component, OnInit } from '@angular/core';
import { newsArticolo } from '../../models/interfacce';
import { Router } from '@angular/router';
import { FirebaseService } from '../../service/firebase.service';
import { db, writeDailySpecial, addNewDocument, readASingleDocument, listenToADocument, cancelMyListenerAtTheAppropriateTime, queryForDocuments } from '../../../environments/environment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsArray: newsArticolo[] = [];

  constructor(private router: Router, private fire: FirebaseService) {
    this.fire.item$.subscribe((item) => console.log('fire', item));
    console.log('prova db', db);
    writeDailySpecial();
    addNewDocument();
    readASingleDocument();
    listenToADocument();
    cancelMyListenerAtTheAppropriateTime();
    queryForDocuments();
  }

  ngOnInit() {
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
        titoloNews: '19^ g.Barletta - Molfetta 1-1',
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
        titoloNews: '12^ g.Barletta - Molfetta 1-1',
        descrizioneNews: 'Finale al "Manzi-Chiapulin", 1-1 tra Barletta e Molfetta',
        linkNews: true,
        urllinkNews: '/',
      },
    ];
  }
  navigaArticolo(titolo: string) {
    let articolo = this.newsArray.find((item) => (item.titoloNews = titolo));
    console.log('articolo', articolo);
    if (articolo) {
      localStorage.setItem('articolo', JSON.stringify(articolo));
      let url = 'news/articolo/' + articolo.titoloNews;
      this.router.navigate([url]);
    }
  }
}
