import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { QuestionAnswerService } from 'src/app/services/question-answer-service/question-answer.service';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import * as UIConstants from './../../../utils/constants';

@Component({
  selector: 'app-related-interview-questions',
  templateUrl: './related-interview-questions.component.html',
  styleUrls: ['./related-interview-questions.component.scss']
})
export class RelatedInterviewQuestionsComponent implements OnInit {
  relatedQuestionAnswerList: any;
  freshersInterviewQuestionsObj: any;
  threeYearsExperienceInterviewQuestionsObj: any;
  fiveYearsExperienceInterviewQuestionsObj: any;
  topAngularInterviewQuestions: any;
  topHTML5InterviewQuestions: any;
  topCSS3InterviewQuestions: any;
  topJavascriptInterviewQuestions: any;

  constructor(
    private loaderService: LoaderService,
    private questionAnswerService: QuestionAnswerService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private highlightService: HightlightService
  ) { 
     this.setQuestionTitleByExperience();
  }

  ngOnInit(): void {
    this.handleRouteChangeEvent();
  }

  setQuestionTitleByExperience() {
    this.freshersInterviewQuestionsObj = UIConstants.topFresherFrontendInterviewQuestions;
    this.threeYearsExperienceInterviewQuestionsObj = UIConstants.topThreeYearsExperienceFrontendInterviewQuestions;
    this.fiveYearsExperienceInterviewQuestionsObj = UIConstants.topFiveYearsExperienceFrontendInterviewQuestions;
    this.topAngularInterviewQuestions = UIConstants.topAngularInterviewQuestions;
    this.topHTML5InterviewQuestions = UIConstants.topHTML5InterviewQuestions;
    this.topCSS3InterviewQuestions = UIConstants.topCSS3InterviewQuestions;
    this.topJavascriptInterviewQuestions = UIConstants.topJavascriptInterviewQuestions;
  }

  handleRouteChangeEvent() {
    this.route.paramMap.subscribe(params => {
       this.getRelatedQuestionAnswer();
    });
  }

  getRelatedQuestionAnswer() {
    this.loaderService.display(true);
    this.questionAnswerService.getRelatedQuestionAnswer().subscribe(response=>{
       this.loaderService.display(false);
       this.relatedQuestionAnswerList= response;
       this.formatQuestionUrl();
       this.cd.detectChanges();
    })
  }

  formatQuestionUrl() {
    if (this.relatedQuestionAnswerList && this.relatedQuestionAnswerList.length > 0) {
      for (const [index, item] of this.relatedQuestionAnswerList.entries()) {
        this.relatedQuestionAnswerList[index]['questionUrl'] = this.questionAnswerService.formatQuestionUrl(item.question);
        // Call addQuestionMarkIfNotPresentCondition to add a question mark if needed
        this.relatedQuestionAnswerList[index]['question'] = this.questionAnswerService.addQuestionMarkIfNotPresentCondition(item.question);
      }
    }
  }
}
