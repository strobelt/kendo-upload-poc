import { TestBed } from '@angular/core/testing';

import { FilePreviewSharedService } from './file-preview-shared.service';

describe('FilePreviewSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilePreviewSharedService = TestBed.get(FilePreviewSharedService);
    expect(service).toBeTruthy();
  });
});
