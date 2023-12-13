import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subscription, debounceTime } from 'rxjs';

import { IPhoto } from 'src/app/core/interfaces/image.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AppState } from 'src/app/core/store/app.state';
import { PhotoState } from 'src/app/core/store/photo/photo.reducer';
import * as PhotoActions from '../../../core/store/photo/photo.actions';
import { selectPhotos } from '../../../core/store/photo/photo.selectors';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy, AfterViewInit {

  private subs: Subscription = new Subscription();
  public loading: boolean = true;
  public photos: Array<IPhoto> = [];
  public page: number = 0;
  public limit: FormControl = new FormControl(10, [Validators.min(1), Validators.max(5000)]);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private localStorageService: LocalStorageService,
    private titleService: Title,
    private store: Store<AppState>
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

    this.subs.add(
      this.store.select(selectPhotos).subscribe(
        (photoState: PhotoState) => {
          this.photos = photoState.photos;
          this.loading = photoState.loading;
        }
      )
    );
  }

  private checkLocalStorage(): void {
    if (this.localStorageService.getItem('photosLimit')) {
      this.limit.patchValue(+JSON.parse(this.localStorageService.getItem('photosLimit') || ''));
    }
  }

  private getImages(): void {
    if (this.limit.valid) {
      this.loading = true;
      this.store.dispatch(PhotoActions.fetchPhotos({ value: { page: this.page + 1, limit: this.limit.value } }));
    }
  }

  changePage(event: any) {
    this.page = event.pageIndex;
    this.limit.patchValue(event.pageSize);
    this.getImages();
  }
}
