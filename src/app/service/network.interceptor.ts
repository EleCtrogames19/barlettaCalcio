import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, catchError, throwError } from 'rxjs';
import { DimensioneSchermoService } from './dimensioneSchermo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private dimensioneSchermoService: DimensioneSchermoService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.dimensioneSchermoService.show();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigateByUrl(`/login`);
        }
        this.dimensioneSchermoService.elementiDialogo.next({
          visible: true,
          header: 'Errore Servizio',
          messagge: 'Contattare l\'assistenza',
          button: ['ok'],
        });
        return throwError(() => error);;
      }),
      finalize(() => {
        this.dimensioneSchermoService.hidden();
      })
    );
  }
}
