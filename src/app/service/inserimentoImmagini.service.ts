import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Immagine, Video } from '../models/interfacce';

@Injectable({
  providedIn: 'root',
})
export class InserimentoImmaginiService {
  constructor(private http: HttpClient) {}
  postImmagine(immagine: File, percorsoCartelle:string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('immagine', immagine);
    console.log('formData',formData);
    return this.http
      .post<any>('http://localhost/database/insertCartellaFile.php?cartella=' + percorsoCartelle, formData,{observe:'response'})
      .pipe(map((res) => res));
  }
}
