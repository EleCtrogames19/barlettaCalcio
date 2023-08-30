import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { newsArticolo } from '../../../models/interfacce';

@Component({
  selector: 'app-articolo',
  templateUrl: './articolo.component.html',
  styleUrls: ['./articolo.component.scss']
})
export class ArticoloComponent implements OnInit {
  articolo: newsArticolo|undefined;
  subscription: Subscription= new Subscription;
  constructor () {
    this.articolo=JSON.parse(localStorage.getItem('articolo')||'')
  }

  ngOnInit() {
    console.log(this.articolo)
  }

}
