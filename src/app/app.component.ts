import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrap">
      <app-header></app-header>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .wrap {
      display: flex;
      flex-direction: column;
      min-height: 100vh
    }
  `]
})
export class AppComponent {
  title = 'jsguru-angular-assessment-test';
}
