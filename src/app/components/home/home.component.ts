import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
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

  constructor() {  }

  ngOnInit() {}   

  ngAfterViewInit(): void {
    this.initVideoJs();
  }

  initVideoJs() {
    this.videoJSplayer = videojs('video_player');
    
    let overlay_content_first = 
    `<div class="rectangle">
    <img  class="close" src="/assets/images/group-37.png">
    <div class="image-block">
      <img src="/assets/images/i-logo-3x.png">
    </div>
    <div class="description">
      <img src="/assets/images/shape.png"><br>
      <hr>
      <p>25 &#8451;</p>
    </div>
    </div>`;
    
    let overlay_content_second = '<p style="color:black;font-size:18px;">M7 Driver</p>'+
    '<a href="https://www.amazon.in/gp/product/B07HGBMJT6/ref=s9_acss_bw_cg_Topbann_2b1_w?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-4&pf_rd_r=560BEDG3SX66V0XFA00Z&pf_rd_t=101&pf_rd_p=6c0e5a1a-a9c2-441c-968c-513e0354b7a3&pf_rd_i=16613114031" target="_blank" style="color:black;font-size:18px;">View Product</a>'+
    '</div>';

    this.videoJSplayer.overlay({
        debug: true,
        overlays: [{
            start: 1,
            content: overlay_content_first,
            end: 'playing',
            align: 'top-right',
            class: 'overlay-first'
        }]
    });
  }

  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }
}





