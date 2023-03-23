import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PadletIndexComponent} from './padlet-index.component';

describe('PadletIndexComponent', () => {
  let component: PadletIndexComponent;
  let fixture: ComponentFixture<PadletIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PadletIndexComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PadletIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
