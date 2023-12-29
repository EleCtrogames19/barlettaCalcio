import { Component, OnDestroy, OnInit } from '@angular/core';
import { Immagine, Video, newsArticolo } from '../../models/interfacce';
import { Router } from '@angular/router';
import { newsService } from '../../service/news.service';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';
import { Subscription } from 'rxjs';
import { ArchivioService } from '../../service/archivio.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  typePage: string = '';

  newsArray: newsArticolo[] = [];
  tutteStagioni: newsArticolo[] = [];
  cambioPaginaNewsStagione: newsArticolo[] = [];

  stagioni: string[] = [];
  stagione: string = '';

  sottoscrizioni: Subscription[] = [];
  width: number = 0;

  first: number = 0;
  rows: number = 10;
  page: number = 1;
  pageCount: number = 0;
  totalRecords: number = 0;

  images: Immagine[] = [];
  tutteImages: Immagine[] = [];
  cambioPaginaFoto: Immagine[] = [];
  video: Video[] = [];
  tutteVideo: Video[] = [];
  cambioPaginaVideo: Video[] = [];

  constructor(private router: Router, private newsService: newsService, private dimensioneSchermoService: DimensioneSchermoService, private archivioService: ArchivioService) {}

  ngOnInit(): void {
    let url: string[] = this.router.url.split('/');
    this.typePage = url[url.length - 1];
    let tmp: string[] = [];

    this.sottoscrizioni.push(this.dimensioneSchermoService.width.subscribe((item) => (this.width = item)));
    if (this.typePage === 'news') {
      this.sottoscrizioni.push(
        this.newsService.getStagioni().subscribe({
          next: (stagioni: string[]): void => {
            tmp = stagioni;
            this.stagioni = [...new Set(tmp)];
            this.stagioni.unshift('TUTTE');
          },
          error: (errore: HttpErrorResponse): void => {
            console.error(`errore: ${errore}`);
          },
        })
      );
      this.sottoscrizioni.push(
        this.newsService.getNews().subscribe({
          next: (item: newsArticolo[]) => {
            this.newsArray = item;
            this.cambioPaginaNewsStagione = this.newsArray;
            this.newsArray.forEach((item) => {
              item.descrizioneNews = item.descrizioneNews.length > 50 ? item.descrizioneNews.slice(0, 51) + '...' : item.descrizioneNews;
              tmp.push(item.stagione);
            });
            this.newsArray = this.newsArray.slice(0, 11);
            this.totalRecords = this.cambioPaginaNewsStagione.length;
          },
          error: (errore: HttpErrorResponse): void => {
            console.error(`errore: ${errore}`);
          },
        })
      );
    } else {
      this.sottoscrizioni.push(
        this.archivioService.getStagioni().subscribe({
          next: (stagioni: string[]): void => {
            tmp = stagioni;
            this.stagioni = [...new Set(tmp)];
            this.stagioni.unshift('TUTTE');
          },
          error: (errore: HttpErrorResponse): void => {
            console.error(`errore: ${errore}`);
          },
          complete: (): void => {
            this.sottoscrizioni.push(
              this.archivioService.getFoto().subscribe({
                next: (foto: Immagine[]): void => {
                  this.images = [...foto];
                  this.cambioPaginaFoto = [...this.images];
                  this.images = [...this.images.slice(0, 11)];
                  this.totalRecords = this.cambioPaginaFoto.length;
                },
              })
            );
            this.sottoscrizioni.push(
              this.archivioService.getVideo().subscribe({
                next: (video: Video[]): void => {
                  this.video = [...video];
                  this.cambioPaginaVideo = [...this.video];
                  this.video = [...this.video.slice(0, 11)];
                  this.totalRecords = this.cambioPaginaVideo.length;
                },
              })
            );
          },
        })
      );
    }
  }

  navigaArticolo(id: number): void {
    let url: string = 'news/articolo/' + id;
    this.router.navigate([url]);
  }
  cambioStagione(): void {
    if (this.stagione === 'TUTTE') {
      this.newsArray = this.tutteStagioni;
      this.images = this.tutteImages;
      this.video = this.tutteVideo;
    } else {
      this.tutteStagioni = this.newsArray;
      this.tutteImages = [...this.images];
      this.tutteVideo = [...this.video];
      let spitStagione: string[] = this.stagione.split('-');
      if (this.typePage === 'news') {
        this.sottoscrizioni.push(
          this.newsService.getNewsByStagione(+spitStagione[0], +spitStagione[1]).subscribe((item: newsArticolo[]) => {
            this.newsArray = item;
            this.cambioPaginaNewsStagione = this.newsArray;
            this.newsArray = this.newsArray.slice(0, 11);
          })
        );
      } else {
        this.sottoscrizioni.push(
          this.archivioService.getFotoByStagione(+spitStagione[0], +spitStagione[1]).subscribe({
            next: (foto: Immagine[]): void => {
              this.images = [...foto];
              this.cambioPaginaFoto = [...this.images];
              this.images = [...this.images.slice(0, 11)];
            },
          })
        );
        this.sottoscrizioni.push(
          this.archivioService.getVideoByStagione(+spitStagione[0], +spitStagione[1]).subscribe({
            next: (video: Video[]): void => {
              this.video = [...video];
              this.cambioPaginaVideo = [...this.video];
              this.video = [...this.video.slice(0, 11)];
            },
          })
        );
      }
    }
    this.totalRecords = this.stagioni.length;
  }
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.newsArray = this.cambioPaginaNewsStagione.slice(this.first, this.first + this.rows);
    this.images = [...this.cambioPaginaFoto.slice(this.first, this.first + this.rows)];
    this.video = [...this.cambioPaginaVideo.slice(this.first, this.first + this.rows)];
  }

  ngOnDestroy(): void {
    this.sottoscrizioni.forEach((item) => item.unsubscribe());
  }
}
