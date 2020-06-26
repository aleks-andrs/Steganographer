import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodingComponent } from './decoding.component';

describe('DecodingComponent', () => {
  let component: DecodingComponent;
  let fixture: ComponentFixture<DecodingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecodingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
