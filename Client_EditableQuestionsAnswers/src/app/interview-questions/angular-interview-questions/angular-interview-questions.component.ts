import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
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
  experienceFromUrl: any;
  totalItems: any;
  constructor(
    private route: ActivatedRoute,
    private questionAnswerService:QuestionAnswerService,
    private loaderService:LoaderService,
    private highlightService: HightlightService,
    ) {
      this.handleRouteDataSubscription();
      this.handleRouteParamMapSubscription();
     }

  ngOnInit(): void {
      this.handleGetQuestionAnswerListSubscription();
  }

  handleGetQuestionAnswerListSubscription() {
    this.questionAnswerService.currentData.subscribe((data)=>{
      if (data && data['result']) {
        this.questionAnswerList = data['result'];
        this.totalItems = data['totalItems'];
        this.loaderService.display(false);
        this.highlightService.hightLightAgain();
      }
   })
   this.checkRouteParamsDataAndGetQuestionAnswer();
  }

  checkRouteParamsDataAndGetQuestionAnswer() {
     if(this.experienceFromUrl || this.experienceFromUrl == 0) {
      this.questionAnswerService.resetServerSideObj();
      //this.questionAnswerService.getQuestionAnswerByExperienceAndType(this.experienceFromUrl);
      this.questionAnswerService.serverSideObj.experience = this.experienceFromUrl;
      this.questionAnswerService.questionAnswerDetailPageEvent.next({
        hideQuestionTypeDropdown: false,
        hideSearchInput: false
     });
     } else if(this.questionTypeFromUrl) {
      this.questionAnswerService.resetServerSideObj();
   //    this.questionAnswerService.getQuestionAnswerByType(this.questionTypeFromUrl);
       this.questionAnswerService.serverSideObj.questionType = this.questionTypeFromUrl;
       this.questionAnswerService.questionAnswerDetailPageEvent.next({
          hideQuestionTypeDropdown: true,
          hideSearchInput: false
       });
     } else {
       this.questionAnswerService.getQuestionAnswerList();
     }
  }

  handleRouteDataSubscription() {
    this.route.data.subscribe(response=> {
       this.experienceFromUrl = response.experience;
       this.questionTypeFromUrl = response.type;
    })
  }

  resetServerSideObj() {
    this.questionAnswerService.resetServerSideObj();
  }

  handleRouteParamMapSubscription() {
    this.route.paramMap.subscribe(data=>{
      console.log('data',data);
    })
  }
}
