import { Injectable } from '@angular/core';

import { ApiPathsEnum } from 'src/app/core/enums/api-paths.enums';
import { RequestService } from 'src/app/core/services/request.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { IComment } from '../interfaces/comment.interface';
import { IPost } from '../interfaces/post.interface';
import { forkJoin, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url: string = environment.apiUrl;

  constructor(
    private requestService: RequestService
  ) {}

  getPosts() {
    let url = `${this.url}${ApiPathsEnum.POSTS}`;
    return this.requestService.get<Array<IPost>>(url);
  }

  getPostById(post: IPost) {
    let url = `${this.url}${ApiPathsEnum.POSTS}/${post.id}`;
    return this.requestService.get<IPost>(url);
  }

  getUsers() {
    let url = `${this.url}${ApiPathsEnum.USERS}`;
    return this.requestService.get<Array<IUser>>(url);
  }

  getUserById(user: IUser) {
    let url = `${this.url}${ApiPathsEnum.USERS}/${user.id}`;
    return this.requestService.get<IUser>(url);
  }

  getCommentsForPost(post: IPost) {
    let url = `${this.url}${ApiPathsEnum.POSTS}/${post.id}${ApiPathsEnum.COMMENTS}`;
    return this.requestService.get<Array<IComment>>(url);
  }
}
