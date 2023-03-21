import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadletCardComponent } from './padlet-card.component';

describe('PadletComponent', () => {
  let component: PadletCardComponent;
  let fixture: ComponentFixture<PadletCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadletCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadletCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
