import { TestBed } from '@angular/core/testing';

import { ProductFilesService } from './product-files.service';

describe('ProductFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductFilesService = TestBed.get(ProductFilesService);
    expect(service).toBeTruthy();
  });
});
