import {Component, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer2, ViewChild} from '@angular/core';
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
  showModal:boolean=false;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private elementRef:ElementRef, private renderer: Renderer2) { 
   }

  ngOnInit() {}   

  ngAfterViewInit(): void {
    this.videoJSplayer = videojs('video_player');
    this.videoJSInit();
    this.generateClickEvent();
  }

  showModalPopup(){
    this.showModal = true;
  }

  closeModal(event){
    this.closeBtn.nativeElement.click();
  }
  
  generateClickEvent(){
    this.videoJSplayer.on('play' , ()=>{
      this.generateDynamicEventsBasedonElement('.box1 .rectangle', '.box1 .close');
      this.generateDynamicEventsBasedonElement('.box2 .rectangle', '.box2 .close');
      this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');

      
      this.elementRef.nativeElement.querySelector('.description').addEventListener('click', this.viewDetailAdOne.bind(this));
      this.elementRef.nativeElement.querySelector('.box2 .view').addEventListener('click', this.viewDetailAdTwo.bind(this));
      this.elementRef.nativeElement.querySelector('.box3 .view').addEventListener('click', this.viewDetailAdThree.bind(this));
    })
  }

  
  generateDynamicEventsBasedonElement(adv_element_selector, close_element_selector){
    let advElement =  this.elementRef.nativeElement.querySelector(adv_element_selector);
      if(advElement){
        let close_element = this.elementRef.nativeElement.querySelector(close_element_selector);
        
        close_element.addEventListener('click', ()=>{
          this.renderer.setStyle(advElement, 'display', 'none');
        })
      }
      
  }
  generateTemplateForOverlay() {
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
          <p>$55.00 </p>
          <img src="/assets/images/nike-logo.png" style="padding-bottom:10px;"><br>
          <a class="view">
            View Product >
          </a>
        </div>
      </div>
      </div>`,
      overlay_content_fourth: `<div class="box4" style="margin-top: -32px;">
        <div class="close">
        <i class="fa fa-times" aria-hidden="true"></i></div>
        <img src="/assets/images/detail-ad1.png">
      </div>`,
      overlay_content_fifth: `<div class="box5">
      <div class="rectangle">
          <div class="close" style="top: 25px;right:23px;">
          <i class="fa fa-times" aria-hidden="true"></i></div>
          <div class="img-wrap">
              <a href="https://www.taylormadegolf.com/M6-Driver/DW-AL197.html?cgid=taylormade-drivers-M5-M6&lang=default#lang=default&start=3&" target="_blank">
              <img src="/assets/images/box5@3x.png">
          </div>
      </div>
    </div>`,
      overlay_content_sixth: `<div class="box4">
      <div class="rectangle">
          <div class="close" style="top: 15px;right:15px;">
          <i class="fa fa-times" aria-hidden="true"></i></div>
          <div class="img-wrap">
          <a href="https://www.golfposer.com/nike-golf-shirt-vapor-solid-habanero-red-ss19" target="_blank">
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
        start: 70,
        content: templateObj.overlay_content_second,
        end: 90,
        align: 'bottom-right'
    },
    {
      start: 145,
      content: templateObj.overlay_content_third,
      end: 166,
      align: 'bottom-left'
    }]
    });
  }

  viewDetailAdThree(){
    let templateObj = this.generateTemplateForOverlay();
    
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 145,
          content: templateObj.overlay_content_third,
          end: 166,
          align: 'bottom-left'
      },
        {
        start: 145,
        content: templateObj.overlay_content_sixth,
        end: 'playing',
        align: 'top-left'
      }]
    })
    this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
    this.generateDynamicEventsBasedonElement('.box4', '.box4 .close');
    
    this.elementRef.nativeElement.querySelector('.box3 .view').addEventListener('click', this.viewDetailAdThree.bind(this));
  }

  viewDetailAdTwo(){
    let templateObj = this.generateTemplateForOverlay();
    
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 70,
          content: templateObj.overlay_content_second,
          end: 90,
          align: 'bottom-right'
      },
        {
        start: 70,
        content: templateObj.overlay_content_fifth,
        end: 'playing',
        align: 'top-right'
      },
      {
        start: 145,
        content: templateObj.overlay_content_third,
        end: 166,
        align: 'bottom-left'
      }]
    })
    this.generateDynamicEventsBasedonElement('.box2 .rectangle', '.box2 .close');
    this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
    this.generateDynamicEventsBasedonElement('.box5', '.box5 .close');
    
    this.elementRef.nativeElement.querySelector('.box2 .view').addEventListener('click', this.viewDetailAdTwo.bind(this));
    this.elementRef.nativeElement.querySelector('.box3 .view').addEventListener('click', this.viewDetailAdThree.bind(this));

  }
  
  viewDetailAdOne(){
    let templateObj = this.generateTemplateForOverlay();
    
    this.videoJSplayer.overlay({
      debug: true,
      overlays: [
        {
          start: 19,
          content: templateObj.overlay_content_first,
          end: 55,
          align: 'top-right'
      },
        {
        start: 19,
        content: templateObj.overlay_content_fourth,
        end: 'playing',
        align: 'top-right',
        class: 'overlay-fourth'
      },
      {
        start: 70,
        content: templateObj.overlay_content_second,
        end: 90,
        align: 'bottom-right'
      },
      {
        start: 145,
        content: templateObj.overlay_content_third,
        end: 166,
        align: 'bottom-left'
      }]
    })
    this.generateDynamicEventsBasedonElement('.box1 .rectangle', '.box1 .close');
    this.generateDynamicEventsBasedonElement('.box2 .rectangle', '.box2 .close');
    this.generateDynamicEventsBasedonElement('.box3 .rectangle', '.box3 .close');
    this.generateDynamicEventsBasedonElement('.box4', '.box4 .close');
    this.elementRef.nativeElement.querySelector('.description').addEventListener('click', this.viewDetailAdOne.bind(this));
    this.elementRef.nativeElement.querySelector('.box2 .view').addEventListener('click', this.viewDetailAdTwo.bind(this));
    this.elementRef.nativeElement.querySelector('.box3 .view').addEventListener('click', this.viewDetailAdThree.bind(this));
    let el = this.elementRef.nativeElement.querySelector(".overlay-fourth");
    let regex = /^vjs-overlay-background$/;
    let classes = el.getAttribute('class').split(' ');
      classes.forEach((cl) => {
          if(cl.match(regex)) {
            this.renderer.removeClass(el, cl);
          }
      });
  }

  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }
}





