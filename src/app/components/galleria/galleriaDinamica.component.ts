import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Immagine, Sponsor, Video } from '../../models/interfacce';
import { Galleria } from 'primeng/galleria';
import { AutoFocus } from 'primeng/autofocus';
import { DimensioneSchermoService } from '../../service/dimensioneSchermo.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-galleria-dinamica',
  templateUrl: './galleriaDinamica.component.html',
  styleUrls: ['./galleriaDinamica.component.scss'],
})
export class GalleriaDinamicaComponent implements OnInit, OnDestroy, OnChanges {
  @Input() images: Immagine[] = [];
  @Input() video: Video[] = [];
  @Input() paginaAttuale: string = '';
  @Input() archivio: boolean = false;

  showThumbnails: boolean = false;

  fullscreen: boolean = false;

  activeIndex: number = 0;

  onFullScreenListener: any;

  sottoscrizioni: Subscription[] = [];
  screenWidth: number = 0;
  first: number = 0;
  rows: number = 1;
  page: number = 1;
  newVideo: Video[] = [];

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

  constructor(private cd: ChangeDetectorRef, private dimensioneSchermoService: DimensioneSchermoService) {
    this.sottoscrizioni.push(this.dimensioneSchermoService.width.subscribe((item) => (this.screenWidth = item)));
  }

  ngOnInit() {
    this.sponsorArray1.next([
      {
        src: 'assets/sponsor/cobbler.jpg',
      },
    ]);
    this.bindDocumentListeners();
  }
  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['video'] && changes['video'].currentValue !== undefined) {
      this.video = changes['video'].currentValue;
      this.newVideo = [this.video[0]];
    }
  }

  toggleFullScreen(): void {
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

  onPageChange(event: any): void {
    this.first = event.first;
    this.newVideo = [this.video[this.first]];
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
    this.sottoscrizioni.forEach((item) => item.unsubscribe());
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
    return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
  }
}
