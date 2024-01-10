import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Immagine, Video } from '../models/interfacce';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArchivioService {
  constructor (private http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getFoto(): Observable<Immagine[]> {
    return this.http.get<Immagine[]>(this.baseUrl+'database/queryArchivio.php?foto=true').pipe(map((res: Immagine[]): Immagine[] => res));
  }
  getFotoByStagione(stagioneDa: number, stagioneA: number): Observable<Immagine[]> {
    return this.http.get<Immagine[]>(this.baseUrl + 'database/queryArchivio.php?stagioneDa=' + stagioneDa + '&stagioneA=' + stagioneA + '&foto=true').pipe(map((res: Immagine[]): Immagine[] => res));
  }
  getVideo(): Observable<Video[]> {
    return this.http.get<Video[]>(this.baseUrl + 'database/queryArchivio.php?video=true').pipe(map((res: Video[]): Video[] => res));
  }
  getVideoByStagione(stagioneDa: number, stagioneA: number): Observable<Video[]> {
    return this.http.get<Video[]>(this.baseUrl + 'database/queryArchivio.php?stagioneDa=' + stagioneDa + '&stagioneA=' + stagioneA + '&video=true').pipe(map((res: Video[]): Video[] => res));
  }
  getStagioni(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'database/queryArchivio.php?stagioni=true').pipe(map((res: any[]): any[] => res));
  }
  postFoto(foto: Immagine): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'database/queryArchivio.php?foto=true', foto);
  }
  postVideo(video: Video): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'database/queryArchivio.php?foto=false', video);
  }
}
