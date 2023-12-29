import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { messaggioUtente } from '../models/interfacce';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}
  getMessaggio(inizio: number, fine: number, limitePagina: number): Observable<messaggioUtente[]> {
    return this.http.get<messaggioUtente[]>(`http://localhost/database/queryMessaggio.php?inizio=${inizio}&fine=${fine}&limitePagina=${limitePagina}&totale=false&conferma=false`).pipe(map((res: messaggioUtente[]): messaggioUtente[] => res));
  }
  getConfermaMessaggio(inizio: number, fine: number, limitePagina: number): Observable<messaggioUtente[]> {
    return this.http.get<messaggioUtente[]>(`http://localhost/database/queryMessaggio.php?inizio=${inizio}&fine=${fine}&limitePagina=${limitePagina}&totale=false&conferma=true`).pipe(map((res: messaggioUtente[]): messaggioUtente[] => res));
  }
  getTotaleRighe(): Observable<{ totaleRighe: number }[]> {
    return this.http.get<{ totaleRighe: number }[]>(`http://localhost/database/queryMessaggio.php?totale=true&conferma=false`).pipe(map((res: { totaleRighe: number }[]): { totaleRighe: number }[] => res));
  }
  getConfermaTotaleRighe(): Observable<{ totaleRighe: number }[]> {
    return this.http.get<{ totaleRighe: number }[]>(`http://localhost/database/queryMessaggio.php?totale=true&conferma=true`).pipe(map((res: { totaleRighe: number }[]): { totaleRighe: number }[] => res));
  }
  postMessaggio(messaggio: messaggioUtente): Observable<any> {
    return this.http.post<any>('http://localhost/database/queryMessaggio.php', messaggio).pipe(map((res) => res));
  }
  cancellaMessaggio(id: string): Observable<any> {
    return this.http.delete<any>('http://localhost/database/queryMessaggio.php?id=' + id).pipe(map((res) => res));
  }
}
