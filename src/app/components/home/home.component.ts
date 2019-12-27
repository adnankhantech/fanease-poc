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

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.videoSrc =  _getVideoSrc(this.deviceService);
  }

  ngOnDestroy(): void {
    console.log('home component destroyed');
  }
}





