import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './modules/home/home.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

const primeModules = [
  CardModule,
  InputTextModule,
  ButtonModule,
  ToastModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ...primeModules,
  ],
  providers: [CookieService, MessageService, ConfirmationService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
