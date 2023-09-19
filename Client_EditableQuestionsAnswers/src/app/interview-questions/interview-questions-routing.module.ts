import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { AngularInterviewQuestionsComponent } from './angular-interview-questions/angular-interview-questions.component';
import { QuestionAnswerDetailComponent } from './angular-interview-questions/question-answer-detail/question-answer-detail.component';
import * as UIConstants from './../utils/constants';
import { customRoutes } from '../utils/custom-routes/customRoutes';

const routes: Routes = [
  ...customRoutes,
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
