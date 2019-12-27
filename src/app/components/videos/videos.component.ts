import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {_getVideoSrc} from '../../constant';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videosCount = [];
  videoSrc: any;
  showModal = false;

  constructor(private deviceService: DeviceDetectorService) {
    this.videosCount = Array(9).fill(0).map((x, i) => i);
   }

   ngOnInit() {
    this.videoSrc =  _getVideoSrc(this.deviceService);
  }

  showModalPopup() {
    this.showModal = true;
  }
}
