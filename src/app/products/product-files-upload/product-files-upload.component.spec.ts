import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilesUploadComponent } from './product-files-upload.component';

describe('ProductFilesUploadComponent', () => {
  let component: ProductFilesUploadComponent;
  let fixture: ComponentFixture<ProductFilesUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFilesUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
