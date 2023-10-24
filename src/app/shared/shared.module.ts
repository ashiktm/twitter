import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';

@NgModule({
  declarations: [NotificationComponent, BlogCardComponent],
  imports: [CommonModule],
  exports: [NotificationComponent, BlogCardComponent],
})
export class SharedModule {}
