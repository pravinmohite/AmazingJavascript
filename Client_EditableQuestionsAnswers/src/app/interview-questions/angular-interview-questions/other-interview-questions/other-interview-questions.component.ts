import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { QuestionAnswerService } from 'src/app/services/question-answer-service/question-answer.service';
import * as UIConstants from './../../../utils/constants';

@Component({
  selector: 'app-other-interview-questions',
  templateUrl: './other-interview-questions.component.html',
  styleUrls: ['./other-interview-questions.component.scss']
})
export class OtherInterviewQuestionsComponent implements OnInit {
  relatedQuestionAnswerList: any;
  topGitInterviewQuestions: any;
  topTypescriptInterviewQuestions: any;
  topJavascriptCodingInterviewQuestions: any;

  constructor(
    private loaderService: LoaderService,
    private questionAnswerService: QuestionAnswerService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { 
     this.setQuestionTitleByExperience();
  }

  ngOnInit(): void {
    //this.handleRouteChangeEvent();
  }

  setQuestionTitleByExperience() {
    this.topGitInterviewQuestions = UIConstants.topGitInterviewQuestions;
    this.topTypescriptInterviewQuestions = UIConstants.topTypescriptInterviewQuestions;
    this.topJavascriptCodingInterviewQuestions = UIConstants.topJavascriptCodingInterviewQuestions;
  }

  // handleRouteChangeEvent() {
  //   this.route.paramMap.subscribe(params => {
  //      this.getRelatedQuestionAnswer();
  //   });
  // }

  // getRelatedQuestionAnswer() {
  //   this.loaderService.display(true);
  //   this.questionAnswerService.getRelatedQuestionAnswer().subscribe(response=>{
  //      this.loaderService.display(false);
  //      this.relatedQuestionAnswerList= response;
  //      this.formatQuestionUrl();
  //      this.cd.detectChanges();
  //   })
  // }

  // formatQuestionUrl() {
  //   if(this.relatedQuestionAnswerList && this.relatedQuestionAnswerList.length >0) {
  //     for(const [index, item] of this.relatedQuestionAnswerList.entries()) {
  //       this.relatedQuestionAnswerList[index]['questionUrl'] = this.questionAnswerService.formatQuestionUrl(item.question);
  //     }
  //   }
  // }
}
