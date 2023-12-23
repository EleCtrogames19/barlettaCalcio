import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor (private http: HttpClient) { }

  getLogin(credenziali:{password:string, username:string}): Observable<any> {
    return this.http.post<any>('http://localhost/database/queryLogin.php', credenziali).pipe(map((res) => res));
  }
}
