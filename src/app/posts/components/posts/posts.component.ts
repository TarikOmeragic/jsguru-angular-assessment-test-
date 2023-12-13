import { Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';

import { IPost } from 'src/app/core/interfaces/post.interface';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { LoggerService } from 'src/app/core/services/logger.service';
import { PostsService } from '../../services/posts.service';

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
    private postsService: PostsService,
    private router: Router,
    private titleService: Title,
    private loggerService: LoggerService
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
    this.subs.add(
      this.postsService.getUsers().subscribe(
        (data) => {
          this.users = data;
          this.getPosts();
          // NGRX
          // Dodati toster
          // Img error
        },
        (error) => {
          this.loggerService.error(`Error getting users: ${error}`);
          this.loading = false;
        }
      )
    );
  }

  private getPosts(): void {
    this.loading = true;
    this.subs.add(
      this.postsService.getPosts(this.userSearch).subscribe(
        (data: Array<IPost>) => {
          this.posts = data;
          this.loading = false;
        },
        (error) => {
          this.loggerService.error(`Error getting posts: ${error}`);
          this.loading = false;
        }
      )
    );
  }

  public selectPost(post: IPost): void {
    if (this.selectedPost && this.selectedPost?.id === post.id) {
      this.selectedPost = null;
    } else {
      this.selectedPost = post;
    }
  }

  public openPostDetails(post: IPost): void {
    this.router.navigate([`posts/${post.id}`]);
  }

}
