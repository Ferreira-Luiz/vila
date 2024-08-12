import { Component, ElementRef, ViewChild } from '@angular/core';
import { SectionTitleComponent } from '../../../shared/ui_elements/section-title/section-title.component';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {
  question1: boolean = true;
  question2: boolean = false;
  question3: boolean = false;
  @ViewChild('firstQuestion') firstQuestion!:ElementRef;
  @ViewChild('secondQuestion') secondQuestion!:ElementRef;
  @ViewChild('lastQuestion') lastQuestion!:ElementRef;

  toggleQuestion(questionNumber: number) {
    this.question1 = false;
    this.question2 = false;
    this.question3 = false;

    switch (questionNumber) {
      case 1:
        this.question1 = !this.question1;
        this.firstQuestion.nativeElement.classList.add('active');
        this.secondQuestion.nativeElement.classList.remove('active');
        this.lastQuestion.nativeElement.classList.remove('active');
        break;
        case 2:
          this.question2 = !this.question2;
          this.secondQuestion.nativeElement.classList.add('active');
          this.firstQuestion.nativeElement.classList.remove('active');
          this.lastQuestion.nativeElement.classList.remove('active');
          break;
          case 3:
            this.question3 = !this.question3;
            this.lastQuestion.nativeElement.classList.add('active');
            this.firstQuestion.nativeElement.classList.remove('active');
            this.secondQuestion.nativeElement.classList.remove('active');
        break;
    }

    this.checkQuestionToogle();
  }

  checkQuestionToogle() {
    if (this.question3) {
      this.lastQuestion.nativeElement.classList.remove('last');
    } else {
      this.lastQuestion.nativeElement.classList.add('last');
    }
  }

}
