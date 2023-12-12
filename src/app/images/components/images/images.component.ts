import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, debounceTime } from 'rxjs';

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
  public limit: FormControl = new FormControl(10, [Validators.min(1)]);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private imagesService: ImagesService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('JSGuru | Photos');
    this.checkLocalStorage();
    this.getImages();
    this.defineSubscriptions();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
  }

  private defineSubscriptions(): void {
    this.subs.add(
      this.limit.valueChanges
        .pipe(debounceTime(500))
        .subscribe((_) => {
          this.getImages();
        })
    );
  }

  private checkLocalStorage(): void {
    if (this.localStorageService.getItem('photosLimit')) {
      this.limit.patchValue(+JSON.parse(this.localStorageService.getItem('photosLimit') || ''));
    }
  }

  private getImages(): void {
    this.spinner.show();
    this.loading = true;
    this.localStorageService.setItem('photosLimit', this.limit.value + '');
    this.subs.add(
      this.imagesService.getPhotos(this.page + 1, this.limit.value).subscribe(
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
    this.limit.patchValue(event.pageSize);
    this.getImages();
  }
}
