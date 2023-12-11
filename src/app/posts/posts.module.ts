import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
