import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductFilesService {

  constructor(private http: HttpClient) { }

  public download(productId: string, fileId: string): Observable<Blob> {
    return this.http
      .get(`${environment.apiUrl}/products/${productId}/files/${fileId}`, {
        responseType: 'blob',
      })
      .pipe(
        map(res => new Blob([res]))
      )
  }
}
