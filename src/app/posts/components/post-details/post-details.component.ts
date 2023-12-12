import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiPathsEnum } from 'src/app/core/enums/api-paths.enums';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IPost } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  public postId!: number;
  public post!: IPost;
  public user!: IUser;
  public loading: boolean = false;
  public ApiPathsEnum = ApiPathsEnum;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('JSGuru | Post details')
    this.postId = this.route.snapshot.params['id'];
    this.getPost();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private getPost(): void {
    this.spinner.show();
    this.subs.add(
      this.postService.getPostById(this.postId).subscribe(
        (data: IPost) => {
          this.post = data;
          this.getPostAuthor();
          this.spinner.hide();
        },
        (error) => {
          console.error('Error getting post: ', error)
          this.spinner.hide();
        }
      )
    );
  }

  private getPostAuthor(): void {
    this.loading = true;
    this.subs.add(
      this.postService.getUserById(this.post.userId).subscribe(
        (data: IUser) => {
          this.user = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error getting post: ', error)
          this.loading = false;
        }
      )
    );
  }
}
