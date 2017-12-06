import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadtemplateComponent } from './uploadtemplate.component';

describe('UploadtemplateComponent', () => {
  let component: UploadtemplateComponent;
  let fixture: ComponentFixture<UploadtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
