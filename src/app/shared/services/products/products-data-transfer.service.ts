import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);
  public productDatas: Array<GetAllProductsResponse> = [];

  setProductsDatas(productsDatas: Array<GetAllProductsResponse>): void {
    if(productsDatas) {
      this.productsDataEmitter$.next(productsDatas);

    }
  }

  getProductDatas(): Array<GetAllProductsResponse> {
    this.productsDataEmitter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => Number(product.amount) > 0))
      )
      .subscribe({
        next: (response) => {
          if(response) this.productDatas = response;
        }
      });
    return this.productDatas;
  }

}
