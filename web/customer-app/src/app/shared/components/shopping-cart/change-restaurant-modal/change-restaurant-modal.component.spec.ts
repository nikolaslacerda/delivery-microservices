import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRestaurantModalComponent } from './change-restaurant-modal.component';

describe('ChangeRestaurantModalComponent', () => {
  let component: ChangeRestaurantModalComponent;
  let fixture: ComponentFixture<ChangeRestaurantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRestaurantModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRestaurantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
