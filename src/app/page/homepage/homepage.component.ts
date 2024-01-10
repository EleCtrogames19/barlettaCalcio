// import {Component, OnInit} from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { Immagine, Sponsor, Video } from '../../models/interfacce';
import { BehaviorSubject } from 'rxjs';
import { ArchivioService } from '../../service/archivio.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  sponsorArray1: BehaviorSubject<Sponsor[]> = new BehaviorSubject<Sponsor[]>([]);
  sponsorArray2: BehaviorSubject<Sponsor[]> = new BehaviorSubject<Sponsor[]>([]);
  elementi: BehaviorSubject<{ foto: any; video: any }> = new BehaviorSubject<{ foto: any; video: any }>({foto:[],video:[]});

  constructor(private archivioService: ArchivioService) {}

  ngOnInit() {
    this.sponsorArray1.next([
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
    ]);
    this.sponsorArray2.next([
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
    ]);

    this.archivioService.getStagioni().subscribe({
      next: (stagioniResponse: string[]) => {
        let stagioni: string[] = [...new Set(stagioniResponse)];
        console.log('response', stagioni);
        let splitStagione: string[] = stagioni[0].split('-');
        this.archivioService.getFotoByStagione(+splitStagione[0], +splitStagione[1]).subscribe({
          next: (foto: Immagine[]): void => {
            console.log('foto',foto)
            this.elementi.next({ foto: [...foto], video: [] });
          },
        });
      },
    });
  }
}
