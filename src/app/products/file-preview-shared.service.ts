import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilePreview } from './file-preview/file-preview.model';

@Injectable({
  providedIn: 'root'
})
export class FilePreviewSharedService {
  private filePreviewSource = new BehaviorSubject<FilePreview>(undefined);
  public currentFilePreview = this.filePreviewSource.asObservable();

  changePreview(productFilePreview: FilePreview) {
    this.filePreviewSource.next(productFilePreview);
  }
}
