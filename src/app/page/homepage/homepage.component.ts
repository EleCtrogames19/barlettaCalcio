// import {Component, OnInit} from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { Immagine, Sponsor, Video } from '../../models/interfacce';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  sponsorArray1: BehaviorSubject<Sponsor[]> = new BehaviorSubject<Sponsor[]>([]);
  sponsorArray2: BehaviorSubject<Sponsor[]> = new BehaviorSubject<Sponsor[]>([]);
  images: Immagine[] = [];

  constructor() {}

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
    this.images.push({
      id: '0',
      itemImageSrc: 'assets/galleria/606652.jpg',
      thumbnailImageSrc: 'assets/galleria/imgp3205_s.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    });
  }
}
