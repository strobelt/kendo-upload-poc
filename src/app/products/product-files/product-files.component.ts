import { Component, Input } from '@angular/core';
import { Product } from '../products.model';

@Component({
  selector: 'app-product-files',
  templateUrl: './product-files.component.html',
  styleUrls: ['./product-files.component.scss']
})
export class ProductFilesComponent {
  @Input() product: Product;
}
