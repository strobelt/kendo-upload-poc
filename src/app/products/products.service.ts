import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from './products.model';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class ProductService extends BehaviorSubject<Product[]> {
    constructor(private http: HttpClient) {
        super([]);
    }

    private data: any[] = [];
    private route = '/products';

    public read() {
        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public reset = () => this.data = [];

    public save(product: Product, isNew?: boolean) {
        this.reset();

        let $save: Observable<Product>;
        if (isNew)
            $save = this.create(product);
        else
            $save = this.update(product);

        $save.subscribe(() => this.read(), () => this.read());
    }

    public remove(product: Product) {
        this.reset();

        this.delete(product)
            .subscribe(() => this.read(), () => this.read());
    }

    private create = (product: Product): Observable<Product> =>
        this.http
            .post(`${this.route}/`, product)
            .pipe(map(res => <Product>res));

    private update = (product: Product): Observable<Product> =>
        this.http
            .put(`${this.route}/${product._id}`, product)
            .pipe(map(res => <Product>res));

    private delete = (product: Product): Observable<any> =>
        this.http
            .delete(`${this.route}/${product._id}`);

    private fetch = (): Observable<Product[]> =>
        this.http
            .get(`${this.route}`)
            .pipe(
                map(res => (<Product[]>res).map(p => <Product>{ ...p, firstOrderedOn: new Date(p.firstOrderedOn) }))
            );
}
