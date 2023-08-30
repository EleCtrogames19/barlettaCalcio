// import {Component, OnInit} from '@angular/core';

import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Galleria } from 'primeng/galleria';
import { Immagine, Sponsor } from '../../models/interfacce';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  images: Immagine[] = [];

  showThumbnails: boolean = false;

  fullscreen: boolean = false;

  activeIndex: number = 0;

  onFullScreenListener: any;

  @ViewChild('galleria') galleria: Galleria | undefined;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  sponsorArray1: BehaviorSubject<Sponsor[]> = new BehaviorSubject<Sponsor[]>([]);
  sponsorArray2: BehaviorSubject<Sponsor[]> = new BehaviorSubject<Sponsor[]>([]);

  constructor(private cd: ChangeDetectorRef) {}

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
    this.images.push(
      {
        itemImageSrc: 'assets/galleria/imgp3205.jpg',
        thumbnailImageSrc: 'assets/galleria/imgp3205_s.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: 'assets/galleria/imgp3206.jpg',
        thumbnailImageSrc: 'assets/galleria/imgp3206_s.jpg',
        alt: 'Description2 for Image 1',
        title: 'Title 2',
      }
    );
    this.bindDocumentListeners();
  }

  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    } else {
      this.openPreviewFullScreen();
    }

    this.cd.detach();
  }

  openPreviewFullScreen() {
    let elem = this.galleria?.element.nativeElement.querySelector('.p-galleria');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem['mozRequestFullScreen']) {
      /* Firefox */
      elem['mozRequestFullScreen']();
    } else if (elem['webkitRequestFullscreen']) {
      /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    } else if (elem['msRequestFullscreen']) {
      /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
    this.cd.detectChanges();
    this.cd.reattach();
  }

  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      // } else if (document['mozCancelFullScreen']) {
      //   document['mozCancelFullScreen']();
      // } else if (document['webkitExitFullscreen']) {
      //   document['webkitExitFullscreen']();
      // } else if (document['msExitFullscreen']) {
      //   document['msExitFullscreen']();
    }
  }

  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener('fullscreenchange', this.onFullScreenListener);
    document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.addEventListener('webkitfullscreenchange', this.onFullScreenListener);
    document.addEventListener('msfullscreenchange', this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener('fullscreenchange', this.onFullScreenListener);
    document.removeEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.removeEventListener('webkitfullscreenchange', this.onFullScreenListener);
    document.removeEventListener('msfullscreenchange', this.onFullScreenListener);
    this.onFullScreenListener = null;
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
    return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
  }
}
