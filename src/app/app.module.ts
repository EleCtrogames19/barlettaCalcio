import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { PageIntroModule } from './page/pageIntro/pageIntro.module';
import { HttpClientModule } from '@angular/common/http';
import { newsService } from './service/news.service';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, PageIntroModule, HttpClientModule],
  providers: [newsService, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
