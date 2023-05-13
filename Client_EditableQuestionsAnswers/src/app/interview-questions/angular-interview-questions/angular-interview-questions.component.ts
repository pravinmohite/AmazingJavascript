import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {QuestionAnswerService} from "../../services/question-answer-service/question-answer.service";
import {LoaderService} from './../../services/loader-service/loader.service';

@Component({
  selector: 'app-angular-interview-questions',
  templateUrl: './angular-interview-questions.component.html',
  styleUrls: ['./angular-interview-questions.component.scss']
})
export class AngularInterviewQuestionsComponent implements OnInit {
  questionAnswerList:any;
  questionTypeFromUrl: any;
  constructor(
    private route: ActivatedRoute,
    private questionAnswerService:QuestionAnswerService,
    private loaderService:LoaderService) {
      this.handleRouteDataSubscription();
     }

  ngOnInit(): void {
      this.handleGetQuestionAnswerListSubscription();
  }

  handleGetQuestionAnswerListSubscription() {
    this.questionAnswerService.currentData.subscribe((data)=>{
      this.questionAnswerList=data;
      this.loaderService.display(false);
   })
   this.checkRouteParamsDataAndGetQuestionAnswer();
  //   this.questionAnswerService.getQuestionAnswerList();
  }

  checkRouteParamsDataAndGetQuestionAnswer() {
     if(this.questionTypeFromUrl) {
       this.questionAnswerService.getQuestionAnswerByType(this.questionTypeFromUrl);
       this.questionAnswerService.questionAnswerDetailPageEvent.next({
          hideDropDown: true
       });
     } else {
       this.questionAnswerService.getQuestionAnswerList();
     }
  }

  handleRouteDataSubscription() {
    this.route.data.subscribe(response=>{
       this.questionTypeFromUrl = response.type;
    })
  }
}
