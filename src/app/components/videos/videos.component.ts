import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

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
    if(this.checkIfMobileDevice()) {
      this.videoSrc = 'https://d3bvzl6owxj5uv.cloudfront.net/output_third.mov';
    } else {
      this.videoSrc = 'https://d3bvzl6owxj5uv.cloudfront.net/Cropped_vid_for_POC.mov';
    }
  }

  checkIfMobileDevice(){
    // return (this.deviceService.getDeviceInfo().userAgent.match(/iPhone/)!= null) || (this.deviceService.getDeviceInfo().userAgent.match(/iPad/)!=null) 
    return (this.deviceService.getDeviceInfo().userAgent.match(/iPhone/) != null);
  }

  showModalPopup() {
    this.showModal = true;
  }
}
