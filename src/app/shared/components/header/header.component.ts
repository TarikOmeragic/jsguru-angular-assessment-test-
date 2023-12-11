import { Component } from '@angular/core';

import { INavbarOption } from '../../interfaces/navbar-option.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public navbarOptions: Array<INavbarOption> = [
    { route: '/posts', name: 'Posts' },
    { route: '/images', name: 'Images' }
  ];

}
