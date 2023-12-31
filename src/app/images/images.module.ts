import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from '../shared/shared.module';
import { ImagesComponent } from './components/images/images.component';
import { ImagesRoutingModule } from './images-routing.module';


@NgModule({
  declarations: [
    ImagesComponent
  ],
  imports: [
    ImagesRoutingModule,
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ImagesModule { }
