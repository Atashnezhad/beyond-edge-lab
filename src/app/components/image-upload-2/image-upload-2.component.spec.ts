import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUpload2Component } from './image-upload-2.component';

describe('ImageUpload2Component', () => {
  let component: ImageUpload2Component;
  let fixture: ComponentFixture<ImageUpload2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageUpload2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUpload2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
