import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { elementiDialogo } from '../models/interfacce';

@Injectable({
  providedIn: 'root',
})
export class DimensioneSchermoService {
  width: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  height: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLoggato: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly loading$: Observable<boolean> = this._loading.asObservable();

  elementiDialogo: BehaviorSubject<elementiDialogo> = new BehaviorSubject<elementiDialogo>({
    visible: false,
    header: '',
    messagge: '',
    button: [],
  });

  constructor() {}

  show(): void {
    this._loading.next(true);
  }

  hidden(): void {
    this._loading.next(false);
  }
}
