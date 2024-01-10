import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor (private http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getLogin(credenziali:{password:string, username:string}): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'database/queryLogin.php', credenziali).pipe(map((res) => res));
  }
}
