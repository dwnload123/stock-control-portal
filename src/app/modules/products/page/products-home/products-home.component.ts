import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from '../../../../shared/services/products/products-data-transfer.service';
import { Router } from '@angular/router';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public productsDatas: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private productsDTTransfer: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getServiceProductDatas();
  }

  getServiceProductDatas(): void {
    const productsLoaded = this.productsDTTransfer.getProductDatas();

    if(productsLoaded.length > 0) {
      this.productsDatas = productsLoaded;
    } else this.getAllProductsDatas();

    console.log('productsDatas', this.productsDatas)
  }

  getAllProductsDatas(): void {
    this.productsService.getAllProducts()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          if(response.length > 0) {
            this.productsDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['dashboard']);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos!',
            life: 2500,
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
