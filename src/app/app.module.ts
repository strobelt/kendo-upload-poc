import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductService } from './products/products.service';
import { ProductFilesComponent } from './products/product-files/product-files.component';
import { ApiInterceptor } from './interceptors/api-interceptor';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ProductFilesUploadComponent } from './products/product-files-upload/product-files-upload.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    ProductsComponent,
    ProductFilesComponent,
    ProductFilesUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonsModule,
    UploadModule,
    DialogsModule
  ],
  providers: [
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
