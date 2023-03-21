import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadletDetailComponent } from './padlet-detail.component';

describe('PadletDetailComponent', () => {
  let component: PadletDetailComponent;
  let fixture: ComponentFixture<PadletDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadletDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadletDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
