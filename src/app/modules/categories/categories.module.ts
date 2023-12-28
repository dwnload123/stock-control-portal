import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesHomeComponent } from './page/categories-home/categories-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CATEGORIES_ROUTES } from './categories.routing';
import { ConfirmationService } from 'primeng/api';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';

const primeNGModules = [
  CardModule,
  ButtonModule,
  TableModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  DynamicDialogModule,
  DropdownModule,
  ConfirmDialogModule,
  TooltipModule,
]

@NgModule({
  declarations: [
    CategoriesHomeComponent,
    CategoriesTableComponent,
    CategoriesFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CATEGORIES_ROUTES),
    SharedModule,
    HttpClientModule,
    ...primeNGModules,
  ],
  providers: [
    DialogService,
    ConfirmationService
  ],
})
export class CategoriesModule { }
