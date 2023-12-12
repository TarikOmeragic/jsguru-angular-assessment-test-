import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, debounceTime } from 'rxjs';

import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IPost } from '../../interfaces/post.interface';
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

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private postsService: PostsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private titleService: Title
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
    this.spinner.show();
    this.loading = true;
    this.subs.add(
      this.postsService.getUsers().subscribe(
        (data) => {
          this.users = data;
          this.getPosts();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error getting users: ', error)
          this.loading = false;
          this.spinner.hide();
        }
      )
    );
  }

  private getPosts(): void {
    this.spinner.show();
    this.loading = true;
    this.subs.add(
      this.postsService.getPosts(this.userSearch).subscribe(
        (data: Array<IPost>) => {
          this.posts = data;
          this.loading = false;
          this.spinner.hide();
        },
        (error) => {
          console.error('Error getting posts: ', error)
          this.loading = false;
          this.spinner.hide();
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
