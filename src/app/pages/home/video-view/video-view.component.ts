import { Component } from '@angular/core';

import { IconsModule } from '../../../icons/icons.module';
import { BannerComponent } from '../../../shared/components/banner/banner.component';

@Component({
  selector: 'app-video-view',
  standalone: true,
  imports: [IconsModule, BannerComponent ],
  templateUrl: './video-view.component.html',
  styleUrl: './video-view.component.css'
})
export class VideoViewComponent {

}
