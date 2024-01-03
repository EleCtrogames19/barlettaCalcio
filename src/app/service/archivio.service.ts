import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Immagine, Video } from '../models/interfacce';

@Injectable({
  providedIn: 'root',
})
export class ArchivioService {
  constructor(private http: HttpClient) {}
  getFoto(): Observable<Immagine[]> {
    return this.http.get<Immagine[]>('http://localhost/database/queryArchivio.php?foto=true').pipe(map((res: Immagine[]): Immagine[] => res));
  }
  getFotoByStagione(stagioneDa: number, stagioneA: number): Observable<Immagine[]> {
    return this.http.get<Immagine[]>('http://localhost/database/queryArchivio.php?stagioneDa=' + stagioneDa + '&stagioneA=' + stagioneA + '&foto=true').pipe(map((res: Immagine[]): Immagine[] => res));
  }
  getVideo(): Observable<Video[]> {
    return this.http.get<Video[]>('http://localhost/database/queryArchivio.php?video=true').pipe(map((res: Video[]): Video[] => res));
  }
  getVideoByStagione(stagioneDa: number, stagioneA: number): Observable<Video[]> {
    return this.http.get<Video[]>('http://localhost/database/queryArchivio.php?stagioneDa=' + stagioneDa + '&stagioneA=' + stagioneA + '&video=true').pipe(map((res: Video[]): Video[] => res));
  }
  getStagioni(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost/database/queryArchivio.php?stagioni=true').pipe(map((res: any[]): any[] => res));
  }
  postFoto(foto: Immagine): Observable<any> {
    return this.http.post<any>('http://localhost/database/queryArchivio.php?foto=true', foto);
  }
  postVideo(video: Video): Observable<any> {
    return this.http.post<any>('http://localhost/database/queryArchivio.php?foto=false', video);
  }
}
