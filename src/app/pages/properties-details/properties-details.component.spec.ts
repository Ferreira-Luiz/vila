import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesDetailsComponent } from './properties-details.component';

describe('PropertiesDetailsComponent', () => {
  let component: PropertiesDetailsComponent;
  let fixture: ComponentFixture<PropertiesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
