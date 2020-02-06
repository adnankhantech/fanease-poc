import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-description-content',
  templateUrl: './video-description-content.component.html',
  styleUrls: ['./video-description-content.component.scss']
})
export class VideoDescriptionContentComponent implements OnInit {

  showModal = false;

  constructor() { }

  ngOnInit() {
  }

  showModalPopup() {
    this.showModal = true;
  }

}
