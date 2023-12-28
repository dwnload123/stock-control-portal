import { Component, EventEmitter, Input, Output } from '@angular/core';
import { productEvent } from 'src/app/models/enums/products/products';
import { DeleteProductAction } from 'src/app/models/interfaces/products/event/DeleteProductAction';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvents = new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProductAction>();

  public productSelected!: GetAllProductsResponse;
  public addProductEvent = productEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = productEvent.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void {
    if(action && action !== '') {
      const productEventsData = id && id !== '' ? {action, id} : { action };
      this.productEvents.emit(productEventsData);
    }
  }

  handleDeleteProduct(product_id: string, productName: string) {
    if(product_id !== '' && productName !== '') {
      this.deleteProductEvent.emit({
        product_id,
        productName,
      })
    }
  }
}
