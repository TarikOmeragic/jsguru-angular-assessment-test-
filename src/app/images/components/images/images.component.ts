import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { IPhoto } from '../../interfaces/image.interface';
import { ImagesService } from '../../services/images.service';

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
    private imagesService: ImagesService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getImages();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
  }

  private checkLocalStorage(): void {
    if (this.localStorageService.getItem('photosLimit')) {
      this.limit = +JSON.parse(this.localStorageService.getItem('photosLimit') || '');
    }
  }

  private getImages(): void {
    this.spinner.show();
    this.loading = true;
    this.localStorageService.setItem('photosLimit', this.limit + '');
    this.subs.add(
      this.imagesService.getPhotos(this.page + 1, this.limit).subscribe(
        (data: Array<IPhoto>) => {
          this.photos = data;
          this.loading = false;
          this.spinner.hide();
        },
        (error) => {
          console.error('Error getting photos: ', error)
          this.loading = false;
          this.spinner.hide();
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
