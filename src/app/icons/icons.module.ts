import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faEnvelope, faHammer, faCalendarDays, faTrophy, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';



@NgModule({
 exports: [FontAwesomeModule]
})

export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faEnvelope, faFacebook,
      faTwitter, faLinkedin,
      faInstagram, faHammer,
      faCalendarDays, faTrophy,
      faTrash, faPen
    );
  }
 }
