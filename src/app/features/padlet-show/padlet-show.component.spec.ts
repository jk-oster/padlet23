import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadletShowComponent } from './padlet-show.component';

describe('PadletDetailComponent', () => {
  let component: PadletShowComponent;
  let fixture: ComponentFixture<PadletShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadletShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadletShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
