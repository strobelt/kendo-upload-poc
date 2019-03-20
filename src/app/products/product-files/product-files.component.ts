import { Component, Input } from '@angular/core';
import { Product } from '../products.model';
import { ProductFilesService } from './product-files.service';
import { ProductFile } from './product-files.model';
import { FilePreviewSharedService } from '../file-preview-shared.service';
import { FilePreview } from '../file-preview/file-preview.model';

@Component({
  selector: 'app-product-files',
  templateUrl: './product-files.component.html',
  styleUrls: ['./product-files.component.scss']
})
export class ProductFilesComponent {
  @Input() product: Product;

  constructor(private productFilesService: ProductFilesService,
    private filePreviewSharedService: FilePreviewSharedService) { }

  public downloadFile(file: ProductFile) {
    this.productFilesService.download(file)
      .subscribe(blob => {
        const a = document.createElement('a');
        a.style.display = 'none';
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = file.originalFileName;
        a.click();
        window.URL.revokeObjectURL(url);
      })
  }

  public previewFile(file: ProductFile) {
    this.productFilesService.download(file)
      .subscribe(blob => {
        this.filePreviewSharedService.changePreview({ blob, file } as FilePreview);
      })
  }
}
