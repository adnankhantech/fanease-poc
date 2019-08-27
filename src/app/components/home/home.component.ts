import {Component, OnInit, AfterViewInit, OnDestroy, ElementRef} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

declare let videojs: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private videoJSplayer: any;

  constructor(private elementRef:ElementRef) { 
   }

  ngOnInit() {}   

  ngAfterViewInit(): void {
    this.videoJSplayer = videojs('video_player');
    this.initVideoJs();
    this.generateClickEvent();

  }

  generateClickEvent(){
    this.videoJSplayer.on('play' , ()=>{
      let el =  this.elementRef.nativeElement.querySelector('.rectangle');
      if(el){
        el.addEventListener('click', this.viewDetail.bind(this));
      }
    })
  }
  initVideoJs() {
    let overlay_content_first = 
    `<div class="rectangle">
    <img  class="close" src="/assets/images/group-37.png">
    <div class="image-block">
      <img src="/assets/images/i-logo-3x.png" style="width:69px;">
    </div>
    <div class="description">
      <img src="/assets/images/shape.png"><br>
      <hr>
      <p>25 &#8451;</p>
    </div>
    </div>`;
    
    let overlay_content_second = 
    `<div class="rectangle">
      <img class="close" src="/assets/images/group-37.png">
      <div class="image-block">
          <img src="/assets/images/bitmap.png">
      </div>
      <div class="description">
        <h2 class="M6-Driver">
          M6 Driver
        </h2>
        <p>$ 499.99</p>
        <img src="/assets/images/group-38.png"><br>
        <a class="view">
          View Product >
        </a>
      </div>
    </div>`;

    let overlay_content_third = 
    `<div class="rectangle">
      <img class="close" src="/assets/images/group-37.png">
      <div class="image-block">
          <img src="/assets/images/tshirt.png">
      </div>
      <div class="description">
        <h2 class="title">
            NIKE GOLF SHIRT
        </h2>
        <p>$ 499.99</p>
        <img src="/assets/images/nike-logo.png"><br>
        <a class="view">
          View Product >
        </a>
      </div>
    </div>`;

    this.videoJSplayer.overlay({
        debug: true,
        overlays: [{
            start: 1,
            content: overlay_content_first,
            end: 5,
            align: 'top-right'
        },
        {
          start: 5,
          content: overlay_content_second,
          end: 10,
          align: 'bottom-right'
      },
      {
        start: 10,
        content: overlay_content_third,
        end: 'playing',
        align: 'bottom-left'
    }]
    });
  }

  viewDetail(){
    alert(1);
  }
  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }
}





