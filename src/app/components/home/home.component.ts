import {Component, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer2} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { $ } from 'protractor';

declare let videojs: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private videoJSplayer: any;
  templateObj:any;
  show:boolean=true;

  constructor(private elementRef:ElementRef, private renderer: Renderer2) { 
   }

  ngOnInit() {}   

  ngAfterViewInit(): void {
    this.videoJSplayer = videojs('video_player');
    this.videoJSInit();
    this.generateClickEvent();
  }

  generateClickEvent(){
    this.videoJSplayer.on('progress' , ()=>{
      const el =  this.elementRef.nativeElement.querySelector('.box1 .rectangle');
      if(el){
        el.addEventListener('click', this.viewDetail.bind(this));
      }

      let element_first = this.elementRef.nativeElement.querySelector('.box1 .close');
      element_first.addEventListener('click', ()=>{
        
        this.renderer.setStyle(el, 'visiblity', 'hidden');
      })
      
    })
  }

  generateTemplateForOverlay() {
    console.log(this.show);
    this.templateObj = {
      overlay_content_first: `<div class="box1">
      <div class="rectangle">
        <img  class="close" src="/assets/images/group-37.png">
        <div class="image-block">
          <img src="/assets/images/i-logo-3x.png" style="width:69px;">
        </div>
        <div class="description">
          <img src="/assets/images/shape.png"><br>
          <hr>
          <p>25 &#8451;</p>
        </div>
        </div>
        </div>`,
      overlay_content_second: `<div class="box2">
        <div class="rectangle ">
          <img class="close" src="/assets/images/group-37.png">
          <div class="image-block">
            <img src="/assets/images/bitmap.png">
          </div>
        <div class="description">
          <h2 class="M6-Driver">
            M6 Driver
          </h2>
          <p>$ 499.99</p>
          <img src="/assets/images/group-38.png" style="padding-bottom:10px;"><br>
          <a class="view">
            View Product >
          </a>
        </div>
      </div>
      </div>`,
      overlay_content_third: `<div class="box3">
      <div class="rectangle">
        <img class="close" src="/assets/images/group-37.png">
        <div class="image-block">
            <img src="/assets/images/tshirt.png">
        </div>
        <div class="description">
          <h2 class="title">
              NIKE GOLF SHIRT
          </h2>
          <p>$ 499.99</p>
          <img src="/assets/images/nike-logo.png" style="padding-bottom:10px;"><br>
          <a class="view">
            View Product >
          </a>
        </div>
      </div>
      </div>`,
      overlay_content_fourth: `<div class="box4">
        <div class="rectangle">
            <img class="close" src="/assets/images/group-37.png">
            <div class="img-wrap">
                <img src="/assets/images/group-40@3x.png">
            </div>
        </div>
    </div>`
    }
    return this.templateObj;
  }

  videoJSInit(){
    let templateObj = this.generateTemplateForOverlay();
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [{
          start: 19,
          content: templateObj.overlay_content_first,
          end: 55,
          align: 'top-right'
      },
      {
        start: 5,
        content: templateObj.overlay_content_second,
        end: 10,
        align: 'bottom-right'
    },
    {
      start: 10,
      content: templateObj.overlay_content_third,
      end: 15,
      align: 'bottom-left'
    }]
  });
  }

  viewDetail(){
    let templateObj = this.generateTemplateForOverlay();
    
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 19,
          content: templateObj.overlay_content_first,
          end: 55,
          align: 'top-right'
      },{
          start: 1,
          content: templateObj.overlay_content_fourth,
          end: 'playing',
          align: 'top-right'
      }]
    })

    
    let el = this.elementRef.nativeElement.querySelector('.box4 .close');
    const element_first = this.elementRef.nativeElement.querySelector('.box1');
    
    if (el){
      el.addEventListener('click', ()=>{
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.box4'), 'display','none');
      })
    }
  }

  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }
}





