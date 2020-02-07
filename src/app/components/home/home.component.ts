import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild, RendererStyleFlags2, OnDestroy} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {_getVideoSrc} from '../../constant';
import { interval } from 'rxjs';

declare let videojs: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  private videoJSplayer: any;
  templateObj: any;
  deviceInfo = null;
  isMobile: boolean;
  isTablet: boolean;
  videoSrc: any;
  logoSrc: string;
  counter: number;

  @ViewChild('closeBtn') closeBtn: ElementRef;
  

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.videoSrc =  _getVideoSrc(this.deviceService);
    this.logoSrc = '/assets/images/xfl/xfl-logo.jpg';
    
   
    // console.log(`It's been ${this.counter} seconds since subscribing!`);
    this.generateTemplateForOverlay();
  }

  ngOnDestroy(): void {
    console.log('home component destroyed');
  }

  
  generateTemplateForOverlay() {

    let overlay_content_first;
    let overlay_content_second;
    let overlay_content_third;
    let overlay_content_fourth;
    let overlay_content_fifth;
    let overlay_skip_ad;
    let overlay_content_logo = '';

    overlay_skip_ad = `<a class="btn btn-info skip-btn text-decoration-none">Skip Intro <i class="fa fa-step-forward" aria-hidden="true"></i></a>`;
    
    overlay_content_first = `<div class="box-ad-1">
      <div class="rectangle">
          <img class="close" src="/assets/images/xfl/close-white.png">
          <div class="image-block">
            <img src="/assets/images/xfl/logo-advertisment.png">
          </div>
        <div class="description">
          <h2 class="M6-Driver">
            <b>JUNE JONES</b>
          </h2>
         <br>
        </div>
        <a class="view">
        &nbsp; View Bio &nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>
          </a>
      </div>
    </div>`;
        overlay_content_second = `<div class="box2">
        <div class="rectangle ">
          <img class="close" src="/assets/images/xfl/close-white.png">
          <div class="image-block">
            <img src="/assets/images/xfl/xfl-initial-ad2.png">
          </div>
        <div class="description">
          <h2 class="M6-Driver">
            <b>Houston Roughnecks</b>
          </h2>
          <p>47 Impact 1/4 Zip</p>
          <img src="/assets/images/xfl/xfl-initial-shop-logo.png" style="padding-bottom:10px;"><br>
          <a class="view">
             View Product &nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      </div>`;
      overlay_content_third=`<div class="box3">
      <div class="rectangle">
          <img class="close" src="/assets/images/xfl/close-white.png">
          <div class="image-block">
            <img src="/assets/images/xfl/xfl-initial-ad3.png">
          </div>
        <div class="description">
          <h2 class="M6-Driver">
            <b>2020 Houston Roughnecks Full Season Plan</b>
          </h2><br>
          <p>5 Events Included</p><br>
          <p class="ticket-price">$100.00</p>
          <p class="timer pull-right" style="margin-top: -14px;">
          00:
          </p>
         <br>
          <a href="https://am.ticketmaster.com/houstonroughnecks/buy?&_ga=2.227939284.89167923.1579707652-701859032.1576609374#/" target="_blank" class="btn btn-danger buy-ticket">
            Buy Tickets
          </a>
        </div>
      </div>
    </div>`;
      overlay_content_fourth = `<div class="box4">
      <div class="close">
      <img class="close" src="/assets/images/xfl/close.png"></div>
      <img src="/assets/images/xfl/xfl-expanded-ad1-content
      .png" class="detail-image">
    </div>`;

    overlay_content_fifth = `<div class="box5">
      <div class="rectangle">
      <div class="close">
          <i class="fa fa-times medium-icon" aria-hidden="true"></i></div>
      <div class="img-wrap">
      <a  onclick="ga('send', 'event', 'Expanded Ad Two', 'clicked');" href="https://shop.xfl.com/collections/houston-roughnecks/products/houston-impact-1-4-zip-fleece2xl" target="_blank">         
      </div>
          <div class="img-wrap">
              <div class="logo-container">
              <img src="/assets/images/xfl/xfl-initial-shop-logo.png" class="logo">
              </div>
              <div class="">
                <img src="/assets/images/xfl/xfl-expanded-ad2-content.png" class="golferTshirt">                
              </div>
          </div>
        
      </div>
    </div>`;
    overlay_content_logo = `<div id="logo-images" class="shadow">
    <img src="../../../assets/images/fb.png">
    <img src="../../../assets/images/twitter.png">
    <img src="../../../assets/images/youtube.png">
    <img src="../../../assets/images/Group 4.png">
  </div>`

    this.templateObj = {
      overlay_skip_ad: overlay_skip_ad,
      overlay_content_first: overlay_content_first,
      overlay_content_second: overlay_content_second,
      overlay_content_third: overlay_content_third,
      overlay_content_fourth: overlay_content_fourth,
      overlay_content_fifth: overlay_content_fifth
      
  };
    // return this.templateObj;
  }

}





