import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ImagesService } from '../../services/images.service';
import { Subscription, debounce, debounceTime } from 'rxjs';
import { IPhoto } from '../../interfaces/image.interface';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy, AfterViewInit {

  private subs: Subscription = new Subscription();
  public loading: boolean = false;
  public photos: Array<IPhoto> = [];
  public page: number = 0;
  public limit: number = 10;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    this.getImages();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
  }

  private getImages(): void {
    this.loading = true;
    this.subs.add(
      this.imagesService.getPhotos(this.page + 1, this.limit).subscribe(
        (data: Array<IPhoto>) => {
          this.photos = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error getting photos: ', error)
          this.loading = false;
        }
      )
    );
  }

  changePage(event: any) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getImages();
  }

  limitChange(event: number) {
    if (event > 0) {
      this.limit = event;
      this.getImages();
    }
  }

}
