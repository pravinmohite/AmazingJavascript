import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { InterviewQuestionsPanelComponent } from './interview-questions-panel/interview-questions-panel.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'updateInterviewQuestions',
    component: InterviewQuestionsPanelComponent
  },
  {
    path:'',
    component:LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminPanelRoutingModule { }
