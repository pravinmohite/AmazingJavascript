import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import { QuestionAnswerService } from "../../services/question-answer-service/question-answer.service";
import { LoaderService } from './../../services/loader-service/loader.service';

@Component({
  selector: 'app-angular-interview-questions',
  templateUrl: './angular-interview-questions.component.html',
  styleUrls: ['./angular-interview-questions.component.scss']
})
export class AngularInterviewQuestionsComponent implements OnInit {
  questionAnswerList: any;
  questionTypeFromUrl: any;
  experienceFromUrl: any;
  totalItems: any;
  currentPage: any;
  pageNumberParamsValue: any;
  articleFeaturedImgPath: any;
  constructor(
    private route: ActivatedRoute,
    private questionAnswerService: QuestionAnswerService,
    private loaderService: LoaderService,
    private highlightService: HightlightService,
  ) {
    this.handleRouteDataSubscription();
    this.handleRouteParamChangeSubscription();
  }

  ngOnInit(): void {
    this.handleGetQuestionAnswerListSubscription();
  }

  ngAfterViewInit() {
    this.getQuestionAnswerServerSideIfNoParams();
  }

  getQuestionAnswerServerSideIfNoParams() {
    if (!this.pageNumberParamsValue && !this.experienceFromUrl && !this.questionTypeFromUrl) {
      this.questionAnswerService.getQuestionAnswerListServerSide();
    }
  }

  handleGetQuestionAnswerListSubscription() {
    this.questionAnswerService.currentData.subscribe((data) => {
      if (data && data['result']) {
        this.questionAnswerList = data['result'];
        this.totalItems = data['totalItems'];
        this.loaderService.display(false);
        this.highlightService.hightLightAgain();
        this.questionAnswerService.scrollToTheTopOfThePage();
      }
    })
    this.checkRouteParamsDataAndGetQuestionAnswer();
  }

  checkRouteParamsDataAndGetQuestionAnswer() {
    if ((this.experienceFromUrl || this.experienceFromUrl == 0) && (this.questionTypeFromUrl && this.questionTypeFromUrl!=='all')) {
      this.questionAnswerService.resetServerSideObj();
      this.questionAnswerService.serverSideObj.experience = this.experienceFromUrl;
      this.questionAnswerService.serverSideObj.questionType = this.questionTypeFromUrl;
      this.questionAnswerService.questionAnswerDetailPageEvent.next({
        hideQuestionTypeDropdown: true,
        hideSearchInput: false
      });
      this.questionAnswerService.getQuestionAnswerListServerSide();
    } else if (this.experienceFromUrl || this.experienceFromUrl == 0) {
      this.questionAnswerService.resetServerSideObj();
      this.questionAnswerService.serverSideObj.experience = this.experienceFromUrl;
      this.questionAnswerService.questionAnswerDetailPageEvent.next({
        hideQuestionTypeDropdown: false,
        hideSearchInput: false
      });
      this.questionAnswerService.getQuestionAnswerListServerSide();
    } else if (this.questionTypeFromUrl) {
      this.questionAnswerService.resetServerSideObj();
      this.questionAnswerService.serverSideObj.questionType = this.questionTypeFromUrl;
      this.questionAnswerService.questionAnswerDetailPageEvent.next({
        hideQuestionTypeDropdown: true,
        hideSearchInput: false
      });
      this.questionAnswerService.getQuestionAnswerListServerSide();
    }
  }

  handleRouteDataSubscription() {
    this.route.data.subscribe(response => {
      this.experienceFromUrl = response.experience;
      this.questionTypeFromUrl = response.type;
      this.articleFeaturedImgPath = response.imgPath;
    })
  }

  handleRouteParamChangeSubscription() {
    this.route.paramMap.subscribe(params => {
       this.pageNumberParamsValue =params.get('pageNumber');
       if(this.pageNumberParamsValue) {
          this.questionAnswerService.serverSideObj.currentPage = this.pageNumberParamsValue? this.pageNumberParamsValue: this.currentPage;
          this.currentPage = this.questionAnswerService.serverSideObj.currentPage;
          this.questionAnswerService.getQuestionAnswerListServerSide(this.questionAnswerService.serverSideObj); 
       }
    });
  }

  resetServerSideObj() {
    this.questionAnswerService.resetServerSideObj();
  }
}
