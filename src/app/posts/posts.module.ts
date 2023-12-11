import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostsRoutingModule } from './posts-routing.module';


@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PostsModule { }
