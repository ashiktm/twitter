import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './core/interceptors/http-error-interceptor.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }, // Register the interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, // Register the interceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
