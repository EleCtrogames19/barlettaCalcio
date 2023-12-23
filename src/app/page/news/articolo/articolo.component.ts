import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { newsArticolo } from '../../../models/interfacce';
import { newsService } from '../../../service/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articolo',
  templateUrl: './articolo.component.html',
  styleUrls: ['./articolo.component.scss']
})
export class ArticoloComponent implements OnInit {
  articolo: newsArticolo|undefined;
  id: number = 0;
  subscription: Subscription= new Subscription;
  constructor (private newsService: newsService, private route: ActivatedRoute) {
    this.route.params.subscribe(item => this.id = item['titolo']);
  }

  ngOnInit() {
     this.newsService.getNewById(this.id).subscribe((item) => {this.articolo=item});
  }

}
