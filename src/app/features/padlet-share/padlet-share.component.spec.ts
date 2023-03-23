import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PadletShareComponent} from './padlet-share.component';

describe('PadletShareComponent', () => {
  let component: PadletShareComponent;
  let fixture: ComponentFixture<PadletShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PadletShareComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PadletShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
