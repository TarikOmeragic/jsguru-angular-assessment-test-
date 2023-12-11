import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime, tap } from 'rxjs';

import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IPost } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts.service';
import { IComment } from '../../interfaces/comment.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  public posts: Array<IPost> = [];
  public users: Array<IUser> = [];
  public columns: Array<string> = ['id', 'title', 'name'];
  public loading: boolean = false;
  public expandedElement!: IPost | null;
  public inputSearch: FormControl = new FormControl('');
  private userSearch!: IUser | undefined;


  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.defineSubscriptions();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private defineSubscriptions(): void {
    this.subs.add(
      this.inputSearch.valueChanges
        .pipe(debounceTime(500))
        .subscribe((searchString: string) => {
          this.getPostsByUserSearch(searchString);
        })
    );
  }

  private getPostsByUserSearch(searchString: string): void {
    if (searchString.length) {
      this.userSearch = this.users.find((user: IUser) => {
        return user.username.toLowerCase().includes(searchString.toLowerCase()) || user.name.toLowerCase().includes(searchString.toLowerCase()) ? user : undefined;
      });
    } else {
      this.userSearch = undefined;
    }
    this.getPosts();
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
      this.postsService.getPosts(this.userSearch).subscribe(
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
