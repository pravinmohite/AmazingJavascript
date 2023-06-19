import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { AngularInterviewQuestionsComponent } from './angular-interview-questions/angular-interview-questions.component';
import { QuestionAnswerDetailComponent } from './angular-interview-questions/question-answer-detail/question-answer-detail.component';
import * as UIConstants from './../utils/constants';

const routes: Routes = [
  {
    path: UIConstants.topFrontendInterviewQuestions.path, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topFrontendInterviewQuestions.title,
      headingTitle: UIConstants.topFrontendInterviewQuestions.headingTitle,
      type: UIConstants.topFrontendInterviewQuestions.type
    }
  },
  {
    path: UIConstants.topHTML5InterviewQuestions.path, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topHTML5InterviewQuestions.title,
      headingTitle: UIConstants.topHTML5InterviewQuestions.headingTitle,
      type: UIConstants.topHTML5InterviewQuestions.type
    }
  },
  {
    path: UIConstants.topCSS3InterviewQuestions.path, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topCSS3InterviewQuestions.title,
      headingTitle: UIConstants.topCSS3InterviewQuestions.headingTitle,
      type: UIConstants.topCSS3InterviewQuestions.type
    }
  },
  {
    path: UIConstants.topJavascriptInterviewQuestions.path, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topJavascriptInterviewQuestions.title,
      headingTitle: UIConstants.topJavascriptInterviewQuestions.headingTitle,
      type: UIConstants.topJavascriptInterviewQuestions.type
    }
  },
  {
    path: UIConstants.topAngularInterviewQuestions.path, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topAngularInterviewQuestions.title,
      headingTitle: UIConstants.topAngularInterviewQuestions.headingTitle,
      type: UIConstants.topAngularInterviewQuestions.type
    }
  },
  {
    path: UIConstants.topFresherFrontendInterviewQuestions.path, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topFresherFrontendInterviewQuestions.title,
      headingTitle: UIConstants.topFresherFrontendInterviewQuestions.headingTitle,
      experience: UIConstants.topFresherFrontendInterviewQuestions.experience,
      type: UIConstants.topFresherFrontendInterviewQuestions.type
    }
  },
  {
    path: UIConstants.topThreeYearsExperienceFrontendInterviewQuestions.path, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topThreeYearsExperienceFrontendInterviewQuestions.title,
      headingTitle: UIConstants.topThreeYearsExperienceFrontendInterviewQuestions.headingTitle,
      experience: UIConstants.topThreeYearsExperienceFrontendInterviewQuestions.experience,
      type: UIConstants.topThreeYearsExperienceFrontendInterviewQuestions.type
    }
  },
  {
    path: UIConstants.topFiveYearsExperienceFrontendInterviewQuestions.path, 
    component: AngularInterviewQuestionsComponent,
    data: {
      title: UIConstants.topFiveYearsExperienceFrontendInterviewQuestions.title,
      headingTitle: UIConstants.topFiveYearsExperienceFrontendInterviewQuestions.headingTitle,
      experience: UIConstants.topFiveYearsExperienceFrontendInterviewQuestions.experience,
      type: UIConstants.topFiveYearsExperienceFrontendInterviewQuestions.type
    }
  },
  {
    path:':question', component: QuestionAnswerDetailComponent
  },
  {
    path: 'page/:pageNumber',
    component: AngularInterviewQuestionsComponent,
  },
  {
    path: 'page/:pageNumber/:searchTerm/:questionType',
    component: AngularInterviewQuestionsComponent,
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
