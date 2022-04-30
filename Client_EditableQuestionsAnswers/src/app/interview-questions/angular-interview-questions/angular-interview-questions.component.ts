import { Component, OnInit } from '@angular/core';
import {QuestionAnswerService} from "../../services/question-answer-service/question-answer.service";
import {LoaderService} from './../../services/loader-service/loader.service';

@Component({
  selector: 'app-angular-interview-questions',
  templateUrl: './angular-interview-questions.component.html',
  styleUrls: ['./angular-interview-questions.component.scss']
})
export class AngularInterviewQuestionsComponent implements OnInit {
  questionAnswerList:any;
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private loaderService:LoaderService) { }

  ngOnInit(): void {
    this.questionAnswerService.currentData.subscribe((data)=>{
      this.questionAnswerList=data;
      this.loaderService.display(false);
   })
    this.questionAnswerService.getQuestionAnswerList();
  }
}
