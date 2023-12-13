import { Component, Input } from '@angular/core';

import { IComment } from 'src/app/core/interfaces/comment.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  @Input() comments: Array<IComment> = [];

  constructor() {}

}
