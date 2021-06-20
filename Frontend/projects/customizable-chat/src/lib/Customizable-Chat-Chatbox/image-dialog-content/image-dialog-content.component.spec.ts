import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogContent } from './image-dialog-content.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('ImageDialogComponent', () => {
  let component: ImageDialogContent;
  let fixture: ComponentFixture<ImageDialogContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDialogContent ],
      imports:[MatDialogModule],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
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
