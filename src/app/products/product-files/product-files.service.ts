import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ProductFile } from './product-files.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFilesService {

  constructor(private http: HttpClient) { }

  public download(file: ProductFile): Observable<Blob> {
    return this.http
      .get(`${environment.apiUrl}/products/${file.product}/files/${file._id}`, {
        responseType: 'blob',
      })
      .pipe(
        map(res => new Blob([res], { type: this.getFileType(file) }))
      )
  }

  public remove(file: ProductFile): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/products/${file.product}/files/${file._id}`);
  }

  private getFileType(file: ProductFile) {
    const extension = file.fileName.substring(file.fileName.lastIndexOf('.') + 1);
    if (extension == 'pdf') return 'application/pdf';
    if (extension == 'jpg' || extension == 'jpeg') return 'image/jpeg';
    return 'application/octet-stream';
  }
}
