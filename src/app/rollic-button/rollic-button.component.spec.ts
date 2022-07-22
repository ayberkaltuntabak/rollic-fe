import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollicButtonComponent } from './rollic-button.component';

describe('RollicButtonComponent', () => {
  let component: RollicButtonComponent;
  let fixture: ComponentFixture<RollicButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollicButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
