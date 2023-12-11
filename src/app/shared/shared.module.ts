import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgxSpinnerModule,
    SpinnerComponent
  ]
})
export class SharedModule { }
