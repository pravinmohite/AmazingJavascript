import { Component, OnInit } from '@angular/core';
import { QuestionAnswerService } from '../services/question-answer-service/question-answer.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private questionAnswerService: QuestionAnswerService) { }

  ngOnInit(): void {
    this.hideNavbarItemsForPrivacyPolicy();
  }

  hideNavbarItemsForPrivacyPolicy() {
    this.questionAnswerService.questionAnswerDetailPageEvent.next({
      hideQuestionTypeDropdown: true,
      hideSearchInput: true
   });
  }
  
}
