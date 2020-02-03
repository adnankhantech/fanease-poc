import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDescriptionContentComponent } from './video-description-content.component';

describe('VideoDescriptionContentComponent', () => {
  let component: VideoDescriptionContentComponent;
  let fixture: ComponentFixture<VideoDescriptionContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDescriptionContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDescriptionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
