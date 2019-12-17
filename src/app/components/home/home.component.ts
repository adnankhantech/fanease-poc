import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild, RendererStyleFlags2, OnDestroy} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

declare let videojs: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private videoJSplayer: any;
  templateObj: any;
  deviceInfo = null;
  isMobile: boolean;
  isTablet: boolean;

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private deviceService: DeviceDetectorService) {
    // this.checkIfMobileDevice();
  }
  
  ngOnInit() { }

  checkIfMobileDevice(){
    return (this.deviceService.getDeviceInfo().userAgent.match(/iphone/)!= null) || (this.deviceService.getDeviceInfo().userAgent.match(/ipad/)!=null) 
  }
  ngAfterViewInit(): void {

    if(this.checkIfMobileDevice()) {
      this.videoJSplayer = videojs('');
    } else {
      this.videoJSplayer = videojs('video_player');
      this.videoJSInit();
      this.generateClickEvent();
      this.videoJSplayer.on('ended', ()=>{
        window.location.reload();
      })
      
      this.playerModificationForFullScreen();
      }
    
  }

  playerModificationForFullScreen(){
    this.videoJSplayer.on('fullscreenchange', ()=>{
      let overlay_first = this.elementRef.nativeElement.querySelector('.overlay-first-initial');
      let overlay_second = this.elementRef.nativeElement.querySelector('.overlay-second-initial');
      let overlay_third = this.elementRef.nativeElement.querySelector('.overlay-third-initial');
      let overlay_fourth =  this.elementRef.nativeElement.querySelector('.overlay-fourth');
      let overlay_second_expanded = this.elementRef.nativeElement.querySelector('.overlay-second-expanded');
      let overlay_third_expanded = this.elementRef.nativeElement.querySelector('.overlay-third-expanded');

      if (window.innerWidth <= 480){
          if (this.videoJSplayer.isFullscreen()){
            this.renderer.setStyle(overlay_first, 'top', '235px');
            this.renderer.setStyle(overlay_second, 'bottom', '25.5em');
            this.renderer.setStyle(overlay_third, 'bottom', '26.5em');
          }
          else{
            if (overlay_first){
              this.renderer.setStyle(overlay_first, 'top', '23px');
            }
            if(overlay_second){
              this.renderer.setStyle(overlay_second, 'bottom', '5.5em');
            }
            if(overlay_third){
              this.renderer.setStyle(overlay_third, 'bottom', '5.5em');
            }
            if(overlay_fourth){
              this.renderer.setStyle(overlay_fourth, 'top', '23px');
            }
            if(overlay_second_expanded){
              this.renderer.setStyle(overlay_second_expanded, 'bottom', '3.5em');
            }
            if(overlay_third_expanded){
              this.renderer.setStyle(overlay_third_expanded, 'top', '50px');
            }
          }
      }
      else if(window.innerWidth >= 768 && window.innerWidth <= 785){
        if (this.videoJSplayer.isFullscreen()){
          this.renderer.setStyle(overlay_first, 'top', '310px');
          this.renderer.setStyle(overlay_second, 'bottom', '33.5em');
          this.renderer.setStyle(overlay_third, 'bottom', '38.5em');
        }
        else{
          if (overlay_first){
            this.renderer.setStyle(overlay_first, 'top', '28px');
          }
          if(overlay_second){
            this.renderer.setStyle(overlay_second, 'bottom', '4.5em');
          }
          if(overlay_third){
            this.renderer.setStyle(overlay_third, 'bottom', '8.5em');
          }
          if(overlay_fourth){
            this.renderer.setStyle(overlay_fourth, 'top', '23px');
          }
          if(overlay_second_expanded){
            this.renderer.setStyle(overlay_second_expanded, 'bottom', '4.5em');
          }
          if(overlay_third_expanded){
            this.renderer.setStyle(overlay_third_expanded, 'top', '64px');
          }
        }
      }
      else if(window.innerWidth == 1024){
        if (this.videoJSplayer.isFullscreen()){
          this.renderer.setStyle(overlay_first, 'top', '115px');
          this.renderer.setStyle(overlay_second, 'bottom', '15.5em');
          this.renderer.setStyle(overlay_third, 'bottom', '15.5em');
        }
        else{
          if (overlay_first){
            this.renderer.setStyle(overlay_first, 'top', '28px');
          }
          if(overlay_second){
            this.renderer.setStyle(overlay_second, 'bottom', '5.5em');
          }
          if(overlay_third){
            this.renderer.setStyle(overlay_third, 'bottom', '8.5em');
          }
          if(overlay_fourth){
            this.renderer.setStyle(overlay_fourth, 'top', '30px');
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
          this.renderer.setStyle(overlay_second, 'bottom', '6.5em');
          this.renderer.setStyle(overlay_third, 'bottom', '10.5em');
        }
        else{
          if (overlay_first){
            this.renderer.setStyle(overlay_first, 'top', '28px');
          }
          if(overlay_second){
            this.renderer.setStyle(overlay_second, 'bottom', '5.5em');
          }
          if(overlay_third){
            this.renderer.setStyle(overlay_third, 'bottom', '8.5em');
          }
          if(overlay_fourth){
            this.renderer.setStyle(overlay_fourth, 'top', '30px');
          }
          if(overlay_second_expanded){
            this.renderer.setStyle(overlay_second_expanded, 'bottom', '5.5em');
          }
          if(overlay_third_expanded){
            this.renderer.setStyle(overlay_third_expanded, 'top', '50px');
          }
        }
      }
    })
  }

  generateClickEvent() {
    this.videoJSplayer.on('play', () => {
      this.generateDynamicEventsBasedonElement('.box1 .rectangle', '.box1 .close');
      this.generateDynamicEventsBasedonElement('.box2 .rectangle', '.box2 .close');
      this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');

      if(window.innerWidth <= 480){
        this.elementRef.nativeElement.querySelector('.image-block').addEventListener('click', this.viewDetailAdOne.bind(this));
      }
      else{
        this.elementRef.nativeElement.querySelector('.description').addEventListener('click', this.viewDetailAdOne.bind(this));
      }
      this.elementRef.nativeElement.querySelector('.box2 .view').addEventListener('click', this.viewDetailAdTwo.bind(this));
      this.elementRef.nativeElement.querySelector('.box3 .view').addEventListener('click', this.viewDetailAdThree.bind(this));
    })
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
  generateTemplateForOverlay() {

    let overlay_content_first;
    let overlay_content_second;
    let overlay_content_third;
    let overlay_content_fourth;

    if(window.innerWidth <= 480){
      overlay_content_first =  `
        <div class="box1">
      <div class="rectangle">
        <img  class="close" src="/assets/images/group-37.png">
        <div class="image-block">
          <img src="/assets/images/i_logo@3x.png" style="width:50px;">
        </div>
        </div>
        </div>`
        overlay_content_second = `<div class="box2">
        <div class="rectangle ">
          <img class="close" src="/assets/images/group-37.png">
          <div class="image-block">
            <img src="/assets/images/Group 16.png">
          </div>
        <div class="description">
          <a class="view">
            View Product >
          </a>
        </div>
      </div>
      </div>`
      overlay_content_third=`<div class="box3">
      <div class="rectangle">
         <img class="close" src="/assets/images/group-37.png">
        <div class="image-block">
            <img src="/assets/images/NIKE_logo@2x.png" style="height:19px;">
        </div>
        <div class="description">
          <a class="view">
            View Product >
          </a>
        </div>
      </div>`
      overlay_content_fourth =  `<div class="box4" style="margin-top: -15px;">
      <div class="close">
      <img class="close" src="/assets/images/group-28.png"></div>
      <img src="/assets/images/iphone-detail-ad1.png">
    </div>`
    }
    else{
      overlay_content_first = `<div class="box1">
      <div class="rectangle">
        <img  class="close" src="/assets/images/group-37.png">
        <div class="image-block">
          <img src="/assets/images/i_logo@3x.png" style="width:69px;">
        </div>
        <div class="description">
          <img src="/assets/images/shape.png"><br>
          <hr>
          <p style="margin-top: -12px;"><b>77 &#8457;</b></p>
        </div>
        </div>
        </div>`
        overlay_content_second=`<div class="box2">
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
      </div>`
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
      </div>`
      overlay_content_fourth = `<div class="box4">
      <div class="close">
      <img class="close" src="/assets/images/group-28.png"></div>
      <img src="/assets/images/detail-ad1.png" class="detail-image">
    </div>`
    }
    this.templateObj = {
      overlay_content_first: overlay_content_first,
      overlay_content_second: overlay_content_second,
      overlay_content_third: overlay_content_third,
      overlay_content_fourth: overlay_content_fourth,
      overlay_content_fifth: `<div class="box5">
      <div class="rectangle">
      <div class="close">
          <i class="fa fa-times medium-icon" aria-hidden="true"></i></div>
      <div class="img-wrap">
      <a href="https://www.taylormadegolf.com/M6-Fairway/N7310509.html?gclid=EAIaIQobChMIqI2s7oG15QIVkIbACh0BzQ_JEAQYAyABEgK4YvD_BwE&kpid=go_2018855898_74490452867_354265192544_pla-605273289299_c&utm_campaign=Seer_Shopping_Smart_HM&utm_medium=cpc&utm_device=c&utm_adgroup=N7310509&lang=default&utm_location=US&utm_source=google&utm_account=taylormadegolf&utm_content=354265192544" target="_blank">         
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
    </div>`,
      overlay_content_sixth: `<div class="box4">
      <div class="rectangle">
          <div class="close">
          <i class="fa fa-times medium-icon" aria-hidden="true"></i></div>
          <div class="img-wrap">
          <a href="https://www.golfposer.com/nike-golf-shirt-vapor-solid-habanero-red-ss19" target="_blank">
          <div class="logo-container">                            
          <img src="../../../assets/images/golferlogo.svg" class="logo">  
          </div>
          <div> 
          <img src="../../../assets/images/Group 23@2x.png" class="golferTshirt">       
          </div>
              
          </div>
          </div>
          
      </div>
    </div>`
    }
    return this.templateObj;
  }

  videoJSInit() {
    let templateObj = this.generateTemplateForOverlay();
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [{
        start: 19,
        content: templateObj.overlay_content_first,
        end: 55,
        align: 'top-right',
        class: 'overlay-first-initial'
      },
      {
        start: 70,
        content: templateObj.overlay_content_second,
        end: 90,
        align: 'bottom-right',
        class: 'overlay-second-initial'
      },
      {
        start: 145,
        content: templateObj.overlay_content_third,
        end: 166,
        align: 'bottom-left',
        class: 'overlay-third-initial'
      }]
    });
  }

  viewDetailAdThree() {
    let templateObj = this.generateTemplateForOverlay();
    let isFullscreen = this.videoJSplayer.isFullscreen();

    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 145,
          content: templateObj.overlay_content_third,
          end: 166,
          align: 'bottom-left',
          class: 'overlay-third-initial'
        },
        {
          start: 145,
          content: templateObj.overlay_content_sixth,
          end: 166,
          align: 'bottom-left',
          class: 'overlay-third-expanded'
        }]
    })
    this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
    this.generateDynamicEventsBasedonElement('.box4', '.box4 .close');

    this.elementRef.nativeElement.querySelector('.box3 .view').addEventListener('click', this.viewDetailAdThree.bind(this));

    if (window.innerWidth <= 480){
      if(isFullscreen){
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-third-expanded'), 'top', '280px');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-third-initial'), 'bottom', '25.5em');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-third-expanded'), 'bottom', '25.5em');
      }
    }
    else if (window.innerWidth == 768){
      if(isFullscreen){
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-third-expanded'), 'top', '345px');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-third-expanded'), 'bottom', '36.5em');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-third-initial'), 'bottom', '36.5em');
      }
    }
    else if(window.innerWidth == 1024){
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
    let templateObj = this.generateTemplateForOverlay();
    let isFullscreen =  this.videoJSplayer.isFullscreen();
    let overlay_third = this.elementRef.nativeElement.querySelector('.overlay-third-initial');

    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 70,
          content: templateObj.overlay_content_second,
          end: 90,
          align: 'bottom-right',
          class: 'overlay-second-initial'
        },
        {
          start: 70,
          content: templateObj.overlay_content_fifth,
          end: 90,
          align: 'bottom-right',
          class: 'overlay-second-expanded'
        },
        {
          start: 145,
          content: templateObj.overlay_content_third,
          end: 166,
          align: 'bottom-left',
          class: 'overlay-third-initial'
        }]
    })
    this.generateDynamicEventsBasedonElement('.box2 .rectangle', '.box2 .close');
    this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
    this.generateDynamicEventsBasedonElement('.box5', '.box5 .close');

    this.elementRef.nativeElement.querySelector('.box2 .view').addEventListener('click', this.viewDetailAdTwo.bind(this));
    this.elementRef.nativeElement.querySelector('.box3 .view').addEventListener('click', this.viewDetailAdThree.bind(this));

    if (window.innerWidth <= 480){
      if(isFullscreen){
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-second-expanded'), 'bottom', '25.5em');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-second-initial'), 'bottom', '25.5em');
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-third-initial'), 'bottom', '25.5em');
      }
    }
    else if (window.innerWidth == 768){
      if(isFullscreen){
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-second-expanded'), 'bottom', '33.5em');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-second-initial'), 'bottom', '33.5em');
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-third-initial'), 'bottom', '36.5em');
      }
    }
    else if(window.innerWidth == 1024){
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
    //this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-second-initial'), 'bottom', '25.5em');
  }

  viewDetailAdOne() {
    let isFullscreen = this.videoJSplayer.isFullscreen();
    let templateObj = this.generateTemplateForOverlay();
    let overlay_second = this.elementRef.nativeElement.querySelector('.overlay-second-initial');
        
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 19,
          content: templateObj.overlay_content_first,
          end: 55,
          align: 'top-right',
          class: 'overlay-first-initial'
        },
        {
          start: 19,
          content: templateObj.overlay_content_fourth,
          end: 55,
          align: 'top-right',
          class: 'overlay-fourth'
        },
        {
          start: 70,
          content: templateObj.overlay_content_second,
          end: 90,
          align: 'bottom-right',
          class: 'overlay-second-initial'
        },
        {
          start: 145,
          content: templateObj.overlay_content_third,
          end: 166,
          align: 'bottom-left',
          class: 'overlay-third-initial'
        }]
    })
    this.generateDynamicEventsBasedonElement('.box1 .rectangle', '.box1 .close');
    this.generateDynamicEventsBasedonElement('.box2 .rectangle', '.box2 .close');
    this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
    this.generateDynamicEventsBasedonElement('.box4', '.box4 .close');


    if (window.innerWidth == 768){
      if(isFullscreen){
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.overlay-fourth'), 'top', '310px');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-first-initial'), 'top', '310px');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-second-initial'), 'bottom', '35.5em');
        // if (overlay_second){
        //   this.renderer.setStyle(overlay_second, 'bottom', '35.5em');
        // }
      }
    }
    else if(window.innerWidth == 1024){
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
    else if (window.innerWidth <= 480){
      if(isFullscreen){
        
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-fourth'), 'top', '235px');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-first-initial'), 'top', '235px');
        this.renderer.setStyle( this.elementRef.nativeElement.querySelector('.overlay-second-initial'), 'bottom', '25.5em');
        // if (overlay_second){
        //   this.renderer.setStyle(overlay_second, 'bottom', '25.5em');
        // }
      }
    }

    if(window.innerWidth <= 480){
      this.elementRef.nativeElement.querySelector('.image-block').addEventListener('click', this.viewDetailAdOne.bind(this));
    }
    else{
      this.elementRef.nativeElement.querySelector('.description').addEventListener('click', this.viewDetailAdOne.bind(this));
    }
    this.elementRef.nativeElement.querySelector('.box2 .view').addEventListener('click', this.viewDetailAdTwo.bind(this));
    this.elementRef.nativeElement.querySelector('.box3 .view').addEventListener('click', this.viewDetailAdThree.bind(this));
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





