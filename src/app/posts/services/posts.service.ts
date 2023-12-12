import { Injectable } from '@angular/core';

import { ApiPathsEnum } from 'src/app/core/enums/api-paths.enums';
import { RequestService } from 'src/app/core/services/request.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url: string = environment.apiUrl;

  constructor(
    private requestService: RequestService
  ) {}

  getPosts(users: Array<IUser>) {
    let url = `${this.url}${ApiPathsEnum.POSTS}?_embed=comments&_expand=user`;
    if (users.length) {
      users.forEach((user: IUser) => {
        url += `&userId=${user.id}`;
      });
    }
    return this.requestService.get<Array<IPost>>(url);
  }

  getPostById(postId: number) {
    let url = `${this.url}${ApiPathsEnum.POSTS}/${postId}?_embed=comments`;
    return this.requestService.get<IPost>(url);
  }

  getUsers() {
    let url = `${this.url}${ApiPathsEnum.USERS}`;
    return this.requestService.get<Array<IUser>>(url);
  }

  getUserById(userId: number) {
    let url = `${this.url}${ApiPathsEnum.USERS}/${userId}`;
    return this.requestService.get<IUser>(url);
  }
}
