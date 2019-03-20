import { Component, Input } from '@angular/core';
import { Product } from '../products.model';
import { ProductFilesService } from './product-files.service';
import { ProductFile } from './product-files.model';

@Component({
  selector: 'app-product-files',
  templateUrl: './product-files.component.html',
  styleUrls: ['./product-files.component.scss']
})
export class ProductFilesComponent {
  @Input() product: Product;

  constructor(private productFilesService: ProductFilesService) { }

  public downloadFile(productId: string, file: ProductFile) {
    this.productFilesService.download(productId, file._id)
      .subscribe(blob => {
        var a = document.createElement("a");
        a.style.display = 'none';
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = file.originalFileName;
        a.click();
        window.URL.revokeObjectURL(url);
      })
  }
}
