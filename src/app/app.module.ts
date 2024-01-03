import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { PageIntroModule } from './page/pageIntro/pageIntro.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { newsService } from './service/news.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NetworkInterceptor } from './service/network.interceptor';
import { BlockUIModule } from 'primeng/blockui';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PageIntroModule,
    HttpClientModule,
    ProgressSpinnerModule,
    BlockUIModule,
    DialogModule,
    ButtonModule
  ],
  providers: [newsService, {
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
