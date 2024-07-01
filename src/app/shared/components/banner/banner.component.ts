import { Component, Input } from '@angular/core';
import { SectionTitleComponent } from '../section-title/section-title.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  @Input() bannerTitle: string = '';
  @Input() bannersubtitle: string = '';

}
