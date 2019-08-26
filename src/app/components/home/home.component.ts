import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';

declare let videojs: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private videoJSplayer: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initVideoJs();
  }

  initVideoJs() {
    this.videoJSplayer = videojs('video_player');
    let player = videojs('video_player');
    
    console.log(player)
    let overlay_content_first = 
    '<div class="rectangle" onload="">'+
    '<img class="close" src="/assets/images/group-37.png">M6 Driver</p>'+
    '<div class="image-block">' +
      '<img src="/assets/images/bitmap.png">'+
    '</div>'+
    '<div class="description">'+
      '<img src="/assets/images/shape.png"><br>' +
      '<hr>' +
      '<p>25 &#8451;</p>' +
    '</div>' +
    '</div>';
    let overlay_content_second = '<p style="color:black;font-size:18px;">M7 Driver</p>'+
    '<a href="https://www.amazon.in/gp/product/B07HGBMJT6/ref=s9_acss_bw_cg_Topbann_2b1_w?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-4&pf_rd_r=560BEDG3SX66V0XFA00Z&pf_rd_t=101&pf_rd_p=6c0e5a1a-a9c2-441c-968c-513e0354b7a3&pf_rd_i=16613114031" target="_blank" style="color:black;font-size:18px;">View Product</a>'+
    '</div>';
    player.overlay({
        debug: true,
        overlays: [{
            start: 5,
            content: overlay_content_first,
            end: 'playing',
            align: 'top-right'
        }, {
            start: 'pause',
            content: overlay_content_second,
            end: 'playing',
            align: 'bottom-right'
        }]
    });
    //player.overlay()
    // const transcript = this.videoJSplayer.transcript();
    // const transcriptCon = document.querySelector('#transcriptContainer');
    // transcriptCon.appendChild(transcript.el());
  }

  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }
}





