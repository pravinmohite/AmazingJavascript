import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

let routes: Routes = [
  {
    path: "", 
    redirectTo:"interview-questions",
    pathMatch: 'full' 
  },
  {
    path: "admin-panel",
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: "interview-questions", 
    loadChildren: () => import('./interview-questions/interview-questions.module').then(m => m.InterviewQuestionsModule)
  },
  {
    path: "privacy-policy", 
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },

  // {
  //   path: "interview-questions/searchKey/:searchKey", 
  //   loadChildren: () => import('./interview-questions/interview-questions.module').then(m => m.InterviewQuestionsModule)
  // },
  { 
    path: '**',
    redirectTo: 'interview-questions', 
    pathMatch: 'full' 
  },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
