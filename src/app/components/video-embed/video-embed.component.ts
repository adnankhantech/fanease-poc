import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {_getVideoSrc} from '../../constant';


@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})

export class VideoEmbedComponent implements OnInit {

  videoSrc: any;
  videoClass: any;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.videoClass = 'video-embed';
    this.videoSrc =  _getVideoSrc(this.deviceService);
  }
}
