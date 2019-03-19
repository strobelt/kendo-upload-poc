import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products.model';
import { ProductFilesService } from './product-files.service';
import { ProductFile } from './product-files.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-files',
  templateUrl: './product-files.component.html',
  styleUrls: ['./product-files.component.scss']
})
export class ProductFilesComponent implements OnInit {
  @Input() product: Product;

  public view: Observable<ProductFile[]>;

  constructor(private filesService: ProductFilesService) { }

  ngOnInit() {
    this.view = this.filesService;

    this.filesService.read(this.product._id);
  }

}
