import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';

const primeNG = [
  ToolbarModule,
  ButtonModule,
  CardModule,
]

@NgModule({
  declarations: [
    ToolbarNavigationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...primeNG,
  ],
  exports: [ToolbarNavigationComponent],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
