import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDealComponent } from './best-deal.component';

describe('BestDealComponent', () => {
  let component: BestDealComponent;
  let fixture: ComponentFixture<BestDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestDealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
