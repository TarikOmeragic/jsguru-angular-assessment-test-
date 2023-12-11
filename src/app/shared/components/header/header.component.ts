import { Component } from '@angular/core';

import { ApiPathsEnum } from 'src/app/core/enums/api-paths.enums';
import { INavbarOption } from '../../interfaces/navbar-option.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public navbarOptions: Array<INavbarOption> = [
    { route: ApiPathsEnum.POSTS, name: 'Posts' },
    { route: ApiPathsEnum.PHOTOS, name: 'Photos' }
  ];

}
