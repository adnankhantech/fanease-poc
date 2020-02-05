import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild, RendererStyleFlags2, OnDestroy, Input, Output} from '@angular/core';
import { ViewEncapsulation, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {GoogleAnalyticsEventsService} from '../../../google-analytics-events.service';
import { interval } from 'rxjs';
// import { EventEmitter } from 'events';

declare let videojs: any;
// declare let ga: Function;

@Component({
  selector: 'app-video-ad',
  templateUrl: './video-ad.component.html',
  styleUrls: ['./video-ad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoAdComponent implements AfterViewInit, OnDestroy {
  private videoJSplayer: any;
  private videoJSplayerAnimation: any;
  templateObj: any;
  deviceInfo = null;
  showModal = true;
  showSkipAd = true;
  @Input() videoSrc?: string;
  @Input() videoClass?: string;
  @Input() videoAdTemplate?: string | any;
  @ViewChild('hiddenBtn') myHiddenBtn: ElementRef;
 
 constructor(private elementRef: ElementRef, private renderer: Renderer2, private deviceService: DeviceDetectorService, private  googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
   
 }

  checkIfMobileDevice(){
    return (this.deviceService.getDeviceInfo().userAgent.match(/iPhone/) != null);
  }

  ngAfterViewInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo().userAgent;
    this.videoJSplayer = videojs('video_player', {plugins: { eventTracking: true } });
    if (this.checkIfMobileDevice()) {
      this.videoJSplayer.src('/assets/videos/animation_mobile.mp4');
      this.sendTimeBasedEventsToGA();
      this.generateEventsOnVideoEnd();
      this.generateEventsOnVideoPlay();
    } else {
      // this.videoJSplayer.src('/assets/videos/animation_web.mp4');
      this.sendTimeBasedEventsToGA();
      this.generateEventsOnVideoPlay();
      this.generateEventsOnVideoEnd();
      this.playerModificationForFullScreen();
      this.calculatePercentageOfVideoWatched();
    }
    this.generateEventsOnVideoPause();
  }

  calculatePercentageOfVideoWatched() {
    this.videoJSplayer.on('tracking:first-quarter', (e, data) => {
      this.googleAnalyticsEventsService.emitEvent('fanease video', '25% watched');
    });

    this.videoJSplayer.on('tracking:second-quarter', (e, data) => {
      this.googleAnalyticsEventsService.emitEvent('fanease video', '50% watched');
    });

    this.videoJSplayer.on('tracking:third-quarter', (e, data) => {
      this.googleAnalyticsEventsService.emitEvent('fanease video', '75% watched');
    });

    this.videoJSplayer.on('tracking:fourth-quarter', (e, data) => {
      this.googleAnalyticsEventsService.emitEvent('fanease video', '100% watched');
    });
  }
  generateEventsOnVideoPause() {
    this.videoJSplayer.on('pause', () => {
      this.googleAnalyticsEventsService.emitEvent('fanease video', 'paused');
    });
  }
  generateEventsOnVideoPlay() {
    this.videoJSplayer.src(this.videoSrc);
    this.videoJSplayer.on('play', () => {
      if (!this.checkIfMobileDevice()) {
        this.videoJSInit();
        this.generateClickEvent();
      }
      if (this.videoJSplayer.src().match(/animation_web/) == null) {
        // this.calculatePercentageOfVideoWatched();
      }
      this.googleAnalyticsEventsService.emitEvent('fanease video', 'play');
    });
  }
  
  generateEventsOnVideoEnd() {
    this.videoJSplayer.on('ended', () => {
      this.googleAnalyticsEventsService.emitEvent('Video Watched', 'end');
      this.showSkipAd =  false;
      this.videoJSplayer.src(this.videoSrc);
      if (!this.checkIfMobileDevice()) {
        this.videoJSInit();
      }
      this.videoJSplayer.play();
    });
  }

  sendTimeBasedEventsToGA() {
    let showTimer = false;
    
    this.videoJSplayer.on('timeupdate', () => {
      const currentVideoTime = parseFloat(this.videoJSplayer.currentTime().toFixed(2));
      
      if (currentVideoTime > 57.10 && currentVideoTime < 57.30){
        const secondsCounter = interval(1000);
        const start = 10;
        let counter;
        const subscription = secondsCounter.subscribe(number =>{
          if (number === 11) {
            subscription.unsubscribe();
            return;
          }
          counter = start - number;
          
          this.elementRef.nativeElement.querySelector('.box3 .timer').innerText = counter < 10 ? '00:0' + counter + ' secs' : '00:' + counter + ' secs' ;
        });
      }
      if (currentVideoTime >= 19.00 && currentVideoTime <= 19.30 ) {
        this.googleAnalyticsEventsService.emitEvent('initial ad 1', 'viewed');
      }
      if (currentVideoTime >= 70.00 && currentVideoTime <= 70.30 ) {
        this.googleAnalyticsEventsService.emitEvent('initial ad 2', 'viewed');
      }
      if (currentVideoTime >= 145.00 && currentVideoTime <= 145.30 ) {
        this.googleAnalyticsEventsService.emitEvent('initial ad 3', 'viewed');
      }
    });
  }

  playerModificationForFullScreen(){
    this.videoJSplayer.on('fullscreenchange', () => {
      this.googleAnalyticsEventsService.emitEvent('fanease video', 'fullscreen mode');
      const overlay_first = this.elementRef.nativeElement.querySelector('.overlay-first-initial');
      const overlay_second = this.elementRef.nativeElement.querySelector('.overlay-second-initial');
      const overlay_third = this.elementRef.nativeElement.querySelector('.overlay-third-initial');
      const overlay_fourth =  this.elementRef.nativeElement.querySelector('.overlay-fourth');
      const overlay_second_expanded = this.elementRef.nativeElement.querySelector('.overlay-second-expanded');
      const overlay_third_expanded = this.elementRef.nativeElement.querySelector('.overlay-third-expanded');
      const overlay_logo = this.elementRef.nativeElement.querySelector('.overlay-logo');

      if(window.innerWidth == 1024){
        if (this.videoJSplayer.isFullscreen()){
          this.renderer.setStyle(overlay_first, 'top', '115px');
          this.renderer.setStyle(overlay_second, 'bottom', '15.5em');
          this.renderer.setStyle(overlay_third, 'bottom', '15.5em');
        }
        else{
          if (overlay_first){
            this.renderer.setStyle(overlay_first, 'top', '55px');
          }
          if(overlay_second){
            this.renderer.setStyle(overlay_second, 'bottom', '5.5em');
          }
          if(overlay_third){
            this.renderer.setStyle(overlay_third, 'bottom', '8.5em');
          }
          if(overlay_fourth){
            this.renderer.setStyle(overlay_fourth, 'top', '55px');
          }
          if(overlay_second_expanded){
            this.renderer.setStyle(overlay_second_expanded, 'bottom', '5.5em');
          }
          if(overlay_third_expanded){
            this.renderer.setStyle(overlay_third_expanded, 'top', '50px');
          }
        }
      }
      else if(window.innerWidth > 1024){
        if (this.videoJSplayer.isFullscreen()){
          this.renderer.setStyle(overlay_first, 'top', '50px');
          this.renderer.setStyle(overlay_fourth, 'top', '48px');
          this.renderer.setStyle(overlay_second, 'bottom', '6.5em');
          this.renderer.setStyle(overlay_third, 'bottom', '10.5em');
          this.renderer.setStyle(overlay_logo, 'left', '60%');
        }
        else{
          if (overlay_first){
            this.renderer.setStyle(overlay_first, 'top', '55px');
          }
          if(overlay_second){
            this.renderer.setStyle(overlay_second, 'bottom', '3.5em');
          }
          if(overlay_third){
            this.renderer.setStyle(overlay_third, 'bottom', '8.5em');
          }
          if(overlay_second_expanded){
            this.renderer.setStyle(overlay_second_expanded, 'bottom', '3.5em');
          }
          if(overlay_third_expanded){
            this.renderer.setStyle(overlay_third_expanded, 'top', '50px');
          }
          this.renderer.setStyle(overlay_logo, 'left', '600px');
        }
      }
    })
  }

  generateClickEvent() {
      this.generateDynamicEventsBasedonElement('.box-ad-1', '.box-ad-1 .close');
      this.generateDynamicEventsBasedonElement('.box2 .rectangle', '.box2 .close');
      this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
      
      this.elementRef.nativeElement.querySelector('.box-ad-1 .view').addEventListener('click', this.viewDetailAdOne.bind(this));
      this.elementRef.nativeElement.querySelector('.box2 .view').addEventListener('click', this.viewDetailAdTwo.bind(this));
  }

  generateDynamicEventsBasedonElement(adv_element_selector, close_element_selector) {
    let advElement = this.elementRef.nativeElement.querySelector(adv_element_selector);
    if (advElement) {
      let close_element = this.elementRef.nativeElement.querySelector(close_element_selector);

      close_element.addEventListener('click', () => {
        this.renderer.setStyle(advElement, 'display', 'none');
      })
    }

  }

  videoJSInit() {
    let templateObj = this.videoAdTemplate;
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
      {
        start: 5,
        content: templateObj.overlay_content_first,
        end: 26,
        align: 'top-right',
        class: 'overlay-first-initial'
      },
      {
        start: 31,
        content: templateObj.overlay_content_second,
        end: 48,
        align: 'bottom-right',
        class: 'overlay-second-initial'
      },
      {
        start: 57,
        content: templateObj.overlay_content_third,
        end: 67,
        align: 'bottom-right',
        class: 'overlay-third-initial'
      },
      {
        start: 1,
        content: templateObj.overlay_content_logo,
        align: 'bottom',
        class: 'overlay-logo'
      }]
    });
  }

  viewDetailAdThree() {
    let templateObj = this.videoAdTemplate;
    let isFullscreen = this.videoJSplayer.isFullscreen();
    this.googleAnalyticsEventsService.emitEvent('Initial Ad Three', 'clicked');
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 57,
          content: templateObj.overlay_content_third,
          end: 67,
          align: 'bottom-right',
          class: 'overlay-third-initial'
        }]
    });
    this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
    this.generateDynamicEventsBasedonElement('.box4', '.box4 .close');


    if(window.innerWidth == 1024){
      if(isFullscreen){
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-third-expanded'), 'top', '240px');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-third-expanded'), 'bottom', '22.5em');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-third-initial'), 'bottom', '22.5em');
      }
    }
    else if(window.innerWidth > 1024){
      if(isFullscreen){
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-third-expanded'), 'top', '332px');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-third-expanded'), 'bottom', '33.5em');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-third-initial'), 'bottom', '33.5em');
      }
    }
  }

  viewDetailAdTwo() {
    let templateObj = this.videoAdTemplate;
    let isFullscreen =  this.videoJSplayer.isFullscreen();
    let overlay_third = this.elementRef.nativeElement.querySelector('.overlay-third-initial');
    this.googleAnalyticsEventsService.emitEvent('Initial Ad Two', 'clicked');
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 31,
          content: templateObj.overlay_content_second,
          end: 48,
          align: 'bottom-right',
          class: 'overlay-second-initial'
        },
        {
          start: 31,
          content: templateObj.overlay_content_fifth,
          end: 48,
          align: 'bottom-right',
          class: 'overlay-second-expanded'
        },
        {
          start: 57,
          content: templateObj.overlay_content_third,
          end: 67,
          align: 'bottom-right',
          class: 'overlay-third-initial'
        },
        {
          start: 0,
          content: templateObj.overlay_content_logo,
          align: 'bottom',
          class: 'overlay-logo'
        }]
    });
    this.generateDynamicEventsBasedonElement('.box2 .rectangle', '.box2 .close');
    this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
    this.generateDynamicEventsBasedonElement('.box5', '.box5 .close');

    this.elementRef.nativeElement.querySelector('.box2 .view').addEventListener('click', this.viewDetailAdTwo.bind(this));

if(window.innerWidth == 1024){
      if(isFullscreen){
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-second-expanded'), 'bottom', '15.5em');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-second-initial'), 'bottom', '15.5em');
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-third-initial'), 'bottom', '15.5em');
      }
    }
    else if(window.innerWidth > 1024){
      if(isFullscreen){
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-second-expanded'), 'bottom', '10.5em');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-second-initial'), 'bottom', '10.5em');
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-third-initial'), 'bottom', '10.5em');
      }
  }
  }

  viewDetailAdOne() {
    let templateObj = this.videoAdTemplate;
    let isFullscreen =  this.videoJSplayer.isFullscreen();
    let overlay_second = this.elementRef.nativeElement.querySelector('.overlay-second-initial');
    this.googleAnalyticsEventsService.emitEvent('Initial Ad One', 'opened');
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 12,
          content: templateObj.overlay_content_first,
          end: 26,
          align: 'top-right',
          class: 'overlay-first-initial'
        },
        {
          start: 12,
          content: templateObj.overlay_content_fourth,
          end: 26,
          align: 'top-right',
          class: 'overlay-fourth'
        },
        {
          start: 31,
          content: templateObj.overlay_content_second,
          end: 48,
          align: 'bottom-right',
          class: 'overlay-second-initial'
        },
        {
          start: 57,
          content: templateObj.overlay_content_third,
          end: 67,
          align: 'bottom-right',
          class: 'overlay-third-initial'
        },
        {
          start: 0,
          content: templateObj.overlay_content_logo,
          align: 'bottom',
          class: 'overlay-logo'
        }]
    });
    this.generateDynamicEventsBasedonElement('.box-ad-1', '.box-ad-1 .close');
    this.generateDynamicEventsBasedonElement('.box2 .rectangle', '.box2 .close');
    this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
    this.generateDynamicEventsBasedonElement('.box4', '.box4 .close');


    if(window.innerWidth == 1024){
      if(isFullscreen){
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-fourth'), 'top', '115px');
          this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-first-initial'), 'top', '115px');
          this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-second-initial'), 'bottom', '15.5em');
      }
    }
    else if(window.innerWidth > 1024){
      if(isFullscreen){
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-fourth'), 'top', '50px');
          this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-first-initial'), 'top', '50px');
          this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-second-initial'), 'bottom', '10.5em');
      }
    }
    
    this.elementRef.nativeElement.querySelector('.box-ad-1 .view').addEventListener('click', this.viewDetailAdOne.bind(this));
    this.elementRef.nativeElement.querySelector('.box2 .view').addEventListener('click', this.viewDetailAdTwo.bind(this));
    let el = this.elementRef.nativeElement.querySelector(".overlay-fourth");
    let regex = /^vjs-overlay-background$/;
    let classes = el.getAttribute('class').split(' ');
    classes.forEach((cl) => {
      if (cl.match(regex)) {
        this.renderer.removeClass(el, cl);
      }
    });
  }

  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }
}