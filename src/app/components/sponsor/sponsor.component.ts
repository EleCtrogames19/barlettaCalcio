import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Sponsor } from '../../models/interfacce';
import { BehaviorSubject, Subscription } from 'rxjs'

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss'],
})
export class SponsorComponent implements OnInit, OnDestroy {
  @Input() sponsorArray: BehaviorSubject<Sponsor[]> | undefined;
  @Input() class: string='';
  array: Sponsor[] = [];
  subscrition: Subscription | undefined;
  constructor() {}

  ngOnInit() {
    this.subscrition= this.sponsorArray?.subscribe(
      items => this.array = items
    );
  }
  ngOnDestroy(): void {
    this.subscrition?.unsubscribe();
  }
}
