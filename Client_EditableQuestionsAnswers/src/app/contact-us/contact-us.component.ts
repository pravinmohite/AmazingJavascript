import { Component, OnInit } from '@angular/core';
import { faPhoneSquare, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { QuestionAnswerService } from '../services/question-answer-service/question-answer.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  faPhoneSquare= faPhoneSquare;
  faEnvelope = faEnvelope;
  pageHeaderClass = '.page-header';
  
  constructor(private questionAnswerService: QuestionAnswerService) { }

  ngOnInit(): void {
    this.hideNavbarItemsForPrivacyPolicy();
  }

  ngAfterViewInit() {
    this.questionAnswerService.scrollToTheTopOfThePage();
  }

  hideNavbarItemsForPrivacyPolicy() {
    this.questionAnswerService.questionAnswerDetailPageEvent.next({
      hideQuestionTypeDropdown: true,
      hideSearchInput: true
    });
  }

}
