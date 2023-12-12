import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CommentsComponent } from './components/comments/comments.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostsRoutingModule } from './posts-routing.module';


@NgModule({
  declarations: [
    PostsComponent,
    CommentsComponent,
    PostDetailsComponent
  ],
  imports: [
    PostsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PostsModule { }
