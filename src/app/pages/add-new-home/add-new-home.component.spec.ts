import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHomeComponent } from './add-new-home.component';

describe('AddNewHomeComponent', () => {
  let component: AddNewHomeComponent;
  let fixture: ComponentFixture<AddNewHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
