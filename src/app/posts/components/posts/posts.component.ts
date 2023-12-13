import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, debounceTime } from 'rxjs';

import { IPost } from 'src/app/core/interfaces/post.interface';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { AppState } from 'src/app/core/store/app.state';
import * as PostActions from 'src/app/core/store/post/post.actions';
import { PostState } from 'src/app/core/store/post/post.reducer';
import * as UserActions from 'src/app/core/store/user/user.actions';
import { UserState } from 'src/app/core/store/user/user.reducer';
import { selectPosts } from '../../../core/store/post/post.selectors';
import { selectUsers } from '../../../core/store/user/user.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  public posts: Array<IPost> = [];
  public users: Array<IUser> = [];
  public columns: Array<string> = ['Id', 'Title', 'Author name', 'Author username'];
  public loading: boolean = true;
  public expandedElement!: IPost | null;
  public inputSearch: FormControl = new FormControl('');
  private userSearch: Array<IUser> = [];
  public selectedPost: IPost | null = null;

  constructor(
    private router: Router,
    private titleService: Title,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('JSGuru | Posts');
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
          this.getPostsByUserSearch(searchString.trim());
        })
    );

    this.subs.add(
      this.store.select(selectUsers).subscribe(
        (userState: UserState) => {
          this.users = userState.users;
          this.loading = userState.loading;
          if (this.users) {
            this.getPosts();
          }
        }
      )
    );

    this.subs.add(
      this.store.select(selectPosts).subscribe(
        (postState: PostState) => {
          this.posts = postState.posts;
          this.loading = postState.loading;
        }
      )
    );
  }

  public clearInputSearch(): void {
    if (this.inputSearch.value !== '') {
      this.inputSearch.setValue('');
    }
  }

  private getPostsByUserSearch(searchString: string): void {
    if (searchString.length) {
      this.userSearch = this.users.filter((user: IUser) => {
        return user.username.toLowerCase().includes(searchString.toLowerCase()) || user.name.toLowerCase().includes(searchString.toLowerCase()) ? user : undefined;
      });
    } else {
      this.userSearch = [];
    }
    this.getPosts();
  }

  private getUsers(): void {    
    this.loading = true;
    this.store.dispatch(UserActions.fetchUsers());
  }

  private getPosts(): void {
    this.loading = true;
    this.store.dispatch(PostActions.fetchPosts({ searchUsers: this.userSearch }));
  }

  public selectPost(post: IPost): void {
    if (this.selectedPost && this.selectedPost?.id === post.id) {
      this.selectedPost = null;
    } else {
      this.selectedPost = post;
    }
  }

  public openPostDetails(postId: number): void {
    this.router.navigate([`posts/${postId}`]);
  }

}
