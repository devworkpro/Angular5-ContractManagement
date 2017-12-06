import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationtypeComponent } from './creationtype.component';

describe('CreationtypeComponent', () => {
  let component: CreationtypeComponent;
  let fixture: ComponentFixture<CreationtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
