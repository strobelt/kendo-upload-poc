import { ProductFile } from '../product-files/product-files.model';

export interface FilePreview {
    blob: Blob,
    file: ProductFile
}