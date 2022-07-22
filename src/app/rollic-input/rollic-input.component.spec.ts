import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollicInputComponent } from './rollic-input.component';

describe('RollicInputComponent', () => {
  let component: RollicInputComponent;
  let fixture: ComponentFixture<RollicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollicInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
