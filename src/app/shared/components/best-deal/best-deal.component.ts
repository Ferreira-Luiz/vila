import { Component } from '@angular/core';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { IconsModule } from '../../../icons/icons.module';

@Component({
  selector: 'app-best-deal',
  standalone: true,
  imports: [SectionTitleComponent, IconsModule],
  templateUrl: './best-deal.component.html',
  styleUrl: './best-deal.component.css'
})
export class BestDealComponent {

}
