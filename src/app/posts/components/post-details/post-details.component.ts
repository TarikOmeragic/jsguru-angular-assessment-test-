import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ApiPathsEnum } from 'src/app/core/enums/api-paths.enums';
import { IPost } from 'src/app/core/interfaces/post.interface';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { AppState } from 'src/app/core/store/app.state';
import { PostDetailsState } from 'src/app/core/store/post/post-details.reducer';
import { fetchPostDetails } from 'src/app/core/store/post/post.actions';
import { selectPost } from 'src/app/core/store/post/post.selectors';
import { UserDetailsState } from 'src/app/core/store/user/user-details.reducer';
import { fetchUserById } from 'src/app/core/store/user/user.actions';
import { selectUser } from 'src/app/core/store/user/user.selectors';

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
    private route: ActivatedRoute,
    private titleService: Title,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('JSGuru | Post details')
    this.postId = this.route.snapshot.params['id'];
    this.defineSubscriptions();
    this.getPost();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private defineSubscriptions(): void {
    this.subs.add(
      this.store.select(selectPost).subscribe((postState: PostDetailsState) => {
        if (postState.post) {
          this.post =  postState.post;
        }
        this.loading = postState.loading;
        if (this.post) {
          this.getPostAuthor();
        }
      })
    );

    this.subs.add(
      this.store.select(selectUser).subscribe((userState: UserDetailsState) => {
        if (userState.user) {
          this.user = userState.user;
        }
        this.loading = userState.loading;
      })
    );
  }

  private getPost(): void {
    this.store.dispatch(fetchPostDetails({ id: this.postId }));
  }

  private getPostAuthor(): void {
    this.loading = true;
    this.store.dispatch(fetchUserById({ id: this.post.userId }));
  }
}
