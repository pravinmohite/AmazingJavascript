import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { NotesRootComponent } from './notes-root/notes-root.component';


const routes: Routes = [
  {
    path: '',
    component: NotesRootComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NotesFeatureRoutingModule { }
