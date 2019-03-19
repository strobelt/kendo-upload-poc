import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductFile } from './product-files.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductFilesService extends BehaviorSubject<ProductFile[]> {
  private data = [];
  private route = (productId: string) =>
    `/products/${productId}/files`;

  constructor(private http: HttpClient) {
    super([])
  }

  public reset = () => this.data = [];

  public read(productId: string) {
    if (this.data.length)
      return super.next(this.data);

    this.fetch(productId)
      .pipe(
        tap(data => this.data = data)
      )
      .subscribe(data => super.next(data))
  }

  private fetch = (productId: string): Observable<ProductFile[]> =>
    this.http
      .get(this.route(productId))
      .pipe(
        map(res => res as ProductFile[])
      )
}
