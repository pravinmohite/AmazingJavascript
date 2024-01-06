import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPostRoutingModule } from './user-post-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule, AngularEditorService } from '@kolkov/angular-editor';
import { UserBlogPopupComponent } from '../user-blog-popup/user-blog-popup.component';
import { UserPostComponent } from './user-post.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditUserPostComponent } from './add-edit-user-post/add-edit-user-post.component';
import { UserPostDetailComponent } from './user-post-detail/user-post-detail.component';
import { OtherUserPostsComponent } from './other-user-posts/other-user-posts.component';
import { RelatedUserPostsComponent } from './related-user-posts/related-user-posts.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    UserPostComponent, 
    UserBlogPopupComponent, AddEditUserPostComponent, UserPostDetailComponent, OtherUserPostsComponent, RelatedUserPostsComponent,
  ],
  imports: [
    CommonModule,
    UserPostRoutingModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    AngularEditorModule,
    NgxPaginationModule,
    AlertModule.forRoot()
  ],
  providers: [
    { provide: AngularEditorService, useClass: AngularEditorService },
  ],
  exports: [
    UserPostComponent,
    RelatedUserPostsComponent,
    UserPostDetailComponent
  ],
})
export class UserPostModule { }
