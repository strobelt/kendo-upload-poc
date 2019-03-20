import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../products.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-files-upload',
  templateUrl: './product-files-upload.component.html',
  styleUrls: ['./product-files-upload.component.scss']
})
export class ProductFilesUploadComponent {
  public product: Product;
  public active = false;

  @Input() public set model(product: Product) {
    this.product = product;
    this.active = !!product;
  }

  @Output() close = new EventEmitter();
  @Output() uploadComplete = new EventEmitter();

  public closeModal() {
    this.active = false;
    this.close.emit();
  }

  public uploadCompleteEvent = () => this.uploadComplete.emit();

  public uploadUrl = () => `${environment.apiUrl}/products/${this.product._id}/files`;
}
