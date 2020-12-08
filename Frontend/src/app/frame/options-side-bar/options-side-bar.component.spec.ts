import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsSideBarComponent } from './options-side-bar.component';

describe('OptionsSideBarComponent', () => {
  let component: OptionsSideBarComponent;
  let fixture: ComponentFixture<OptionsSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
