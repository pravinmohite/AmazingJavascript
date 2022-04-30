import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';

let routes: Routes = [
  {
    path: "", 
    redirectTo:"frontend-interview-questions",
    pathMatch: 'full' 
  },
  {
    path: "notes",
    loadChildren: () => import('./notes-feature/notes-feature.module').then(m => m.NotesFeatureModule)
  },
  {
    path: "admin-panel",
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: "frontend-interview-questions", 
    loadChildren: () => import('./interview-questions/interview-questions.module').then(m => m.InterviewQuestionsModule)
  },
  {
    path: "frontend-interview-questions/:searchKey", 
    loadChildren: () => import('./interview-questions/interview-questions.module').then(m => m.InterviewQuestionsModule)
  },
  { 
    path: '**',
    redirectTo: 'frontend-interview-questions', 
    pathMatch: 'full' 
  },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
