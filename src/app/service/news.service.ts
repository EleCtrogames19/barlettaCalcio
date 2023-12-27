import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { newsArticolo } from '../models/interfacce';

@Injectable({
  providedIn: 'root',
})
export class newsService {
  constructor(private http: HttpClient) {}

  getStagioni(): Observable<string[]> {
    console.log('invio');
    return this.http.get<string[]>('http://localhost/database/queryNews.php?stagioni=true').pipe(map((res: any[]): any[] => res));
  }
  getNews(): Observable<any[]> {
    console.log('invio');
    return this.http.get<any[]>('http://localhost/database/queryNews.php').pipe(map((res) => res));
  }
  getNewById(id: number): Observable<any> {
    return this.http.get<any>('http://localhost/database/queryNews.php?id=' + id).pipe(map((res) => res));
  }
  getNewsByStagione(stagioneDa: number, stagioneA: number): Observable<any> {
    return this.http.get<any>('http://localhost/database/queryNews.php?stagioneDa=' + stagioneDa + '&stagioneA=' + stagioneA).pipe(map((res) => res));
  }

  creaNews(news: newsArticolo): Observable<any> {
    return this.http.post<any>('http://localhost/database/queryNews.php', news).pipe(map((res) => res));
  }
}
