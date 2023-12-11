import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IPost } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts.service';
import { IComment } from '../../interfaces/comment.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  public posts: Array<IPost> = [];
  public users: Array<IUser> = [];
  public loading: boolean = false;

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit(): void {

    this.getUsers();
    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private getUsers(): void {
    this.loading = true;
    this.subs.add(
      this.postsService.getUsers().subscribe(
        (data) => {
          this.users = data;
          this.getPosts();
          this.loading = false;
        },
        (error) => {
          console.error('Error getting users: ', error)
          this.loading = false;
        }
      )
    );
  }

  private getPosts(): void {
    this.loading = true;
    this.subs.add(
      this.postsService.getPosts().subscribe(
        (data) => {
          this.posts = data;
          this.assignUsersToPosts();
          this.loading = false;
        },
        (error) => {
          console.error('Error getting posts: ', error)
          this.loading = false;
        }
      )
    );
  }

  private assignUsersToPosts(): void {
    this.posts = this.posts.map((post: IPost) => {
      const user = this.users.find((user: IUser) => user.id === post.userId);
      return { 
        ...post, 
        user: user || null 
      };
    });
  }

  private getCommentsForPost(post: IPost): void {
    post.loading = true;
    this.subs.add(
      this.postsService.getCommentsForPost(post).subscribe(
        (data: Array<IComment>) => {
          post.comments = data;
          post.loading = false;
        },
        (error) => {
          console.error(`Error getting comments for post ${post.id}: `, error);
          post.loading = false;
        }
      )
    );
  }

}
