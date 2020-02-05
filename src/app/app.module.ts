import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import {GoogleAnalyticsEventsService} from "./google-analytics-events.service";
import { CountdownModule } from 'ngx-countdown';


import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { VideoEmbedComponent } from './components/video-embed/video-embed.component';
import { VideoAdComponent } from './shared/components/video-ad/video-ad.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideoDescriptionContentComponent } from './components/video-description-content/video-description-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    VideoEmbedComponent,
    VideoAdComponent,
    VideosComponent,
    VideoDescriptionContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountdownModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    GoogleAnalyticsEventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
