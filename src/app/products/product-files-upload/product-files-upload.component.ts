import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../products.model';
import { ProductFilesService } from '../product-files/product-files.service';
import { UploadEvent, FileInfo } from '@progress/kendo-angular-upload';
import { Observable } from 'rxjs-compat/Observable';

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
    this.active = product !== undefined;
  }

  @Output() cancel = new EventEmitter();

  constructor(private filesService: ProductFilesService) { }

  public close() {
    this.active = false;
    this.cancel.emit();
  }

  public uploadEventHandler(e: UploadEvent) {
    e.preventDefault();
    e.files.forEach(file => this.uploadFile(file));
  }

  private uploadFile(file: FileInfo): void {
    console.log(file);
    this.filesService.upload(this.product._id, file.rawFile);
  }

}
