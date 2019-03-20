import { Component, OnInit } from '@angular/core';
import { FilePreview } from './file-preview.model';
import { FilePreviewSharedService } from '../file-preview-shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html'
})
export class FilePreviewComponent implements OnInit {
  public showPreview = false;
  public productFilePreview: FilePreview;
  public url: string;

  constructor(private filePreviewSharedService: FilePreviewSharedService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.filePreviewSharedService.currentFilePreview.subscribe(preview => {
      this.productFilePreview = preview;
      if (this.productFilePreview) {
        this.url = window.URL.createObjectURL(this.productFilePreview.blob);
        this.showPreview = true;
      }
    });
  }

  public closePreview() {
    this.showPreview = false;
    window.URL.revokeObjectURL(this.url);
    this.url = undefined;
    this.filePreviewSharedService.changePreview(undefined);
  }

  public getBlobUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
