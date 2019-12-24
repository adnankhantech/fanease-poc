import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

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
    if (this.checkIfMobileDevice()) {
      this.videoSrc = 'https://d3bvzl6owxj5uv.cloudfront.net/output_third.mov';
    } else {
      this.videoSrc = 'https://d3bvzl6owxj5uv.cloudfront.net/Cropped_vid_for_POC.mov';
    }
  }

  checkIfMobileDevice(){
    // return (this.deviceService.getDeviceInfo().userAgent.match(/iPhone/)!= null) || (this.deviceService.getDeviceInfo().userAgent.match(/iPad/)!=null) 
    return (this.deviceService.getDeviceInfo().userAgent.match(/iPhone/) != null);
  }
  

}
