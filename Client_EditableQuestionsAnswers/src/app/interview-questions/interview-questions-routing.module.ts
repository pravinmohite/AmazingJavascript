import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { AngularInterviewQuestionsComponent } from './angular-interview-questions/angular-interview-questions.component';
import { QuestionAnswerDetailComponent } from './angular-interview-questions/question-answer-detail/question-answer-detail.component';

const routes: Routes = [
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
