import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DashboardHomeComponent } from './modules/dashboard/page/dashboard-home/dashboard-home.component';
import { AuthGuard } from './guards/auth.service';
import { ProductsHomeComponent } from './modules/products/page/products-home/products-home.component';
import { CategoriesHomeComponent } from './modules/categories/page/categories-home/categories-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsHomeComponent,
    loadChildren: () => import('./modules/products/products.module').then((m) => m.ProductsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoriesHomeComponent,
    loadChildren: () => import('./modules/categories/categories.module').then((m) => m.CategoriesModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
