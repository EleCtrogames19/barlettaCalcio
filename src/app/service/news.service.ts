import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { newsArticolo } from '../models/interfacce';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class newsService {
  constructor (private http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getTotaleNews(): Observable<any[]> {
        return this.http.get<any>(this.baseUrl + 'database/queryNews.php?totale=true').pipe(map((res: any[]): any[] => res));
  }

  getStagioni(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'database/queryNews.php?stagioni=true&totale=false').pipe(map((res: any[]): any[] => res));
  }
  getNews(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'database/queryNews.php?totale=false').pipe(map((res) => res));
  }
  getNewById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'database/queryNews.php?id=' + id + '&totale=false').pipe(map((res) => res));
  }
  getNewsByStagione(stagioneDa: number, stagioneA: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'database/queryNews.php?stagioneDa=' + stagioneDa + '&stagioneA=' + stagioneA + '&totale=false').pipe(map((res) => res));
  }

  creaNews(news: newsArticolo): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'database/queryNews.php', news).pipe(map((res) => res));
  }
}
