import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPostComponent } from './user-post.component';

const routes: Routes = [
   {
      path: 'page/:pageNumber',
      component: UserPostComponent,
    },
    {
      path: 'page/:pageNumber/:searchTerm/:questionType',
      component: UserPostComponent,
    },
    {
      path: '',
      component: UserPostComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPostRoutingModule { }
