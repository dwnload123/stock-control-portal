import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { productEvent } from 'src/app/models/enums/products/products';
import { ProductFormComponent } from 'src/app/modules/products/components/product-form/product-form.component';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
})
export class ToolbarNavigationComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private dialogService: DialogService,
  ) {}

  handleLogout() {
    this.cookieService.delete('USER_INFO');
    this.router.navigate(['home']);
  }

  handleSaleProduct(): void {
    const saleProductAction = productEvent.SALE_PRODUCT_EVENT
    this.dialogService.open(ProductFormComponent, {
      header: saleProductAction,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: { action: saleProductAction }
      }
    })
  }
}
