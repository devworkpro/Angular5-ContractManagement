import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContracttypeComponent } from './contracttype.component';

describe('ContracttypeComponent', () => {
  let component: ContracttypeComponent;
  let fixture: ComponentFixture<ContracttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContracttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContracttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
