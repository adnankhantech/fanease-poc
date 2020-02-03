import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild, RendererStyleFlags2, OnDestroy} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {_getVideoSrc} from '../../constant';

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
  logoSrc:string;


  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.videoSrc =  _getVideoSrc(this.deviceService);
    this.logoSrc = '/assets/images/xfl/xfl-logo.jpg';
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
    let overlay_content_sixth;
    let overlay_skip_ad;
    let overlay_content_logo = '';

      overlay_skip_ad = `<a class="btn btn-info skip-btn text-decoration-none">Skip Intro <i class="fa fa-step-forward" aria-hidden="true"></i></a>`;
      overlay_content_first = `<div class="box-ad-1">
      <div>
      <img class="close" src="/assets/images/xfl/close-white.png"></div>
      <img src="/assets/images/xfl/xfl-initial-ad1.png">
    </div>`;
        overlay_content_second = `<div class="box2">
        <div class="rectangle ">
          <img class="close" src="/assets/images/group-37.png">
          <div class="image-block">
            <img src="/assets/images/group-17.png">
          </div>
        <div class="description">
          <h2 class="M6-Driver">
            M6 Fairway
          </h2>
          <p>$299.99</p>
          <img src="/assets/images/Group 16.png" style="padding-bottom:10px;"><br>
          <a class="view">
            View Product >
          </a>
        </div>
      </div>
      </div>`;
      overlay_content_third=`<div class="box3">
      <div class="rectangle">
        <img class="close" src="/assets/images/group-37.png">
        <div class="image-block">
            <img src="/assets/images/tshirt.png">
        </div>
        <div class="description">
          <h2 class="title">
              NIKE GOLF SHIRT
          </h2>
          <p>$49.99 </p>
          <img src="/assets/images/NIKE_logo.png" style="padding-bottom:10px;"><br>
          <a class="view">
            View Product >
          </a>
        </div>
      </div>
      </div>`;
      overlay_content_fourth = `<div class="box4">
      <div class="close">
      <img class="close" src="/assets/images/xfl/close.png"></div>
      <img src="/assets/images/xfl/xfl-expanded-ad2.png" class="detail-image">
    </div>`;

    overlay_content_fifth = `<div class="box5">
      <div class="rectangle">
      <div class="close">
          <i class="fa fa-times medium-icon" aria-hidden="true"></i></div>
      <div class="img-wrap">
      <a  onclick="ga('send', 'event', 'Expanded Ad Two', 'clicked');" href="https://www.taylormadegolf.com/M6-Fairway/N7310509.html?gclid=EAIaIQobChMIqI2s7oG15QIVkIbACh0BzQ_JEAQYAyABEgK4YvD_BwE&kpid=go_2018855898_74490452867_354265192544_pla-605273289299_c&utm_campaign=Seer_Shopping_Smart_HM&utm_medium=cpc&utm_device=c&utm_adgroup=N7310509&lang=default&utm_location=US&utm_source=google&utm_account=taylormadegolf&utm_content=354265192544" target="_blank">         
      </div>
          <div class="img-wrap">
              <div class="logo-container">                            
              <img src="../../../assets/images/tailormadelogo.svg" class="logo">  
              </div>
              <div class="">
                <img src="../../../assets/images/bitmapbox6_new.png" class="golferTshirt">                
              </div>
          </div>
        
      </div>
    </div>`;
      overlay_content_sixth = `<div class="box4">
      <div class="rectangle">
          <div class="close">
          <i class="fa fa-times medium-icon" aria-hidden="true"></i></div>
          <div class="img-wrap">
          <a onclick="ga('send', 'event', 'Expanded Ad Three', 'clicked');" href="https://www.golfposer.com/nike-golf-shirt-vapor-solid-habanero-red-ss19" target="_blank">
          <div class="logo-container">
          <img src="../../../assets/images/golferlogo.svg" class="logo">
          </div>
          <div>
          <img src="../../../assets/images/Group 23@2x.png" class="golferTshirt">
          </div>
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





