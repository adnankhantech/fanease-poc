import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAdComponent } from './video-ad.component';

describe('VideoAdComponent', () => {
  let component: VideoAdComponent;
  let fixture: ComponentFixture<VideoAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
