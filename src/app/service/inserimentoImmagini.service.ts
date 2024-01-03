import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InserimentoImmaginiService {
  constructor(private http: HttpClient) {}
  postImmagineVideo(immagine: File, percorsoCartelle:string, video:boolean): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('immagine', immagine);
    return this.http.post<any>(`http://localhost/database/insertCartellaFile.php?cartella=${percorsoCartelle}&video=${video.toString()}`, formData, { observe: 'response' }).pipe(map((res) => res));
  }
}
