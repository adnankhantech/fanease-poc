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

export class HomeComponent implements OnInit {
  private videoJSplayer: any;
  templateObj: any;
  deviceInfo = null;
  isMobile: boolean;
  isTablet: boolean;
  videoSrc: any;

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private deviceService: DeviceDetectorService) {
    // this.checkIfMobileDevice();
  }
  
  checkIfMobileDevice(){
    // return (this.deviceService.getDeviceInfo().userAgent.match(/iPhone/)!= null) || (this.deviceService.getDeviceInfo().userAgent.match(/iPad/)!=null) 
    return (this.deviceService.getDeviceInfo().userAgent.match(/iPhone/) != null);
  }
  
  ngOnInit(): void {
    if(this.checkIfMobileDevice()) {
      this.videoSrc = 'https://d3bvzl6owxj5uv.cloudfront.net/output_third.mov';
    } else {
      this.videoSrc = 'https://d3bvzl6owxj5uv.cloudfront.net/Cropped_vid_for_POC.mov';
    }
  }
}





