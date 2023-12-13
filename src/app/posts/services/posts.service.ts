import { Injectable } from '@angular/core';

import { ApiPathsEnum } from 'src/app/core/enums/api-paths.enums';
import { IPost } from 'src/app/core/interfaces/post.interface';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { RequestService } from 'src/app/core/services/request.service';
import { environment } from 'src/environments/environment';

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
    let url = `${this.url}${ApiPathsEnum.POSTS}/${postId}?_embed=comments&_expand=user`;
    return this.requestService.get<IPost>(url);
  }

  getUsers() {
    let url = `${this.url}${ApiPathsEnum.USERS}`;
    return this.requestService.get<Array<IUser>>(url);
  }
}
