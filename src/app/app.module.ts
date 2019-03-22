import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductService } from './products/products.service';
import { ProductFilesComponent } from './products/product-files/product-files.component';
import { ApiUrlInterceptor as ApiUrlInterceptor } from './interceptors/api-url.interceptor';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ProductFilesUploadComponent } from './products/product-files-upload/product-files-upload.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FilePreviewSharedService } from './products/file-preview-shared.service';
import { FilePreviewComponent } from './products/file-preview/file-preview.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UserService } from './user/user.service';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    ProductsComponent,
    ProductFilesComponent,
    ProductFilesUploadComponent,
    FilePreviewComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonsModule,
    UploadModule,
    DialogsModule,
    FormsModule,
    InputsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    UserService,
    FilePreviewSharedService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
