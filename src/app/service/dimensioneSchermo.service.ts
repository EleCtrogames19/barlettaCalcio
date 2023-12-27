import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DimensioneSchermoService {
  width: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  height: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLoggato: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}
}
