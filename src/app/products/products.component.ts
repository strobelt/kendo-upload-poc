import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { map } from 'rxjs/operators/map';
import { ProductService } from './products.service';
import { Product } from './products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public formGroup: FormGroup;
  public productToUploadFiles: Product;

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.view = this.productService.pipe(map(data => process(data, this.gridState)));
    this.productService.read();
  }

  public hasFiles = (dataItem: Product): boolean => dataItem.files && dataItem.files.length > 0;

  public openUploadModal = (product: Product) => this.productToUploadFiles = product;

  public closeUploadModal() {
    this.productToUploadFiles = undefined;
    this.updateProducts();
  }

  public updateProducts() {
    this.productService.reset();
    this.productService.read();
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.productService.read();
  }

  public sortable = {
    allowUnsort: true,
    mode: 'multiple'
  };

  public addHandler({ sender }) {
    const group = new FormGroup({
      'name': new FormControl('', Validators.required),
      'unitPrice': new FormControl(0, Validators.min(0)),
      firstOrderedOn: new FormControl(new Date())
    });

    sender.addRow(group);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    const group = new FormGroup({
      '_id': new FormControl(dataItem._id),
      'name': new FormControl(dataItem.name, Validators.required),
      'unitPrice': new FormControl(dataItem.unitPrice),
      'firstOrderedOn': new FormControl(dataItem.firstOrderedOn)
    });

    sender.editRow(rowIndex, group);
  }
  public cancelHandler({ sender, rowIndex }) {
    sender.closeRow(rowIndex)
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const product: Product = formGroup.value;

    this.productService.save(product, isNew);

    sender.closeRow(rowIndex);
  }
  public removeHandler({ dataItem }) {
    this.productService.remove(dataItem);
  }
}
