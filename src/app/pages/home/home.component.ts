import { Component } from '@angular/core';

import { BestDealComponent } from '../../shared/components/best-deal/best-deal.component';
import { FeaturedComponent } from './featured/featured.component';
import { TopSectionComponent } from './top-section/top-section.component';
import { VideoViewComponent } from './video-view/video-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
  TopSectionComponent, FeaturedComponent,
  VideoViewComponent, BestDealComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
