import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { AngularInterviewQuestionsComponent } from './angular-interview-questions/angular-interview-questions.component';
import { QuestionAnswerDetailComponent } from './angular-interview-questions/question-answer-detail/question-answer-detail.component';
import * as UIConstants from './../utils/constants';

const routes: Routes = [
  {
    path: UIConstants.topFrontendInterviewQuestionsPath, 
    component: AngularInterviewQuestionsComponent,
    data: {title: UIConstants.topFrontendInterviewQuestionsTitle}
  },
  {
    path: UIConstants.topHTML5InterviewQuestionsPath, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topHTML5InterviewQuestionsTitle,
      type: UIConstants.html5Type
    }
  },
  {
    path: UIConstants.topCSS3InterviewQuestionsPath, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topCSS3InterviewQuestionsTitle,
      type: UIConstants.css3Type
    }
  },
  {
    path: UIConstants.topJavascriptInterviewQuestionsPath, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topJavascriptInterviewQuestionsTitle,
      type: UIConstants.javascriptType
    }
  },
  {
    path: UIConstants.topAngularInterviewQuestionsPath, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topAngularInterviewQuestionsTitle,
      type: UIConstants.angularType
    }
  },
  {
    path:':question', component: QuestionAnswerDetailComponent
  },
  {
    path: '',
    component: AngularInterviewQuestionsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InterviewQuestionsRoutingModule { }
