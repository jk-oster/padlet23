import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadletStoreComponent } from './padlet-store.component';

describe('PadletStoreComponent', () => {
  let component: PadletStoreComponent;
  let fixture: ComponentFixture<PadletStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadletStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadletStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
