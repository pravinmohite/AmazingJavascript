import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPostDetailComponent } from './user-post-detail/user-post-detail.component';
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
      path: 'author/:userName',
      component: UserPostComponent,
    },
    {
      path: 'author/:userName/page/:pageNumber',
      component: UserPostComponent,
    },
    {
       path: ':postId/:question',
       component: UserPostDetailComponent,
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
