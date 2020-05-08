import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordmanagerComponent } from './passwordmanager.component';

describe('PasswordmanagerComponent', () => {
  let component: PasswordmanagerComponent;
  let fixture: ComponentFixture<PasswordmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
