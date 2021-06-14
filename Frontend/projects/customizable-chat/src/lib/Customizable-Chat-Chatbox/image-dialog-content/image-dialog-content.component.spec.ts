import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogContent } from './image-dialog-content.component';

describe('ImageDialogComponent', () => {
  let component: ImageDialogContent;
  let fixture: ComponentFixture<ImageDialogContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDialogContent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDialogContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
