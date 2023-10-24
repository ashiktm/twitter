import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    MainComponent,
    CreateBlogComponent,
    BlogCardComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, // Register the interceptor
  // ],
})
export class HomeModule {}
