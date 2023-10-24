import { animate, style, trigger, transition } from '@angular/animations';
import { Component } from '@angular/core';
import {
  NotificationService,
  NotificationType,
} from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class NotificationComponent {
  notifications: { type: NotificationType; message: string }[] = []; // This array holds notifications.
  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications.subscribe((notification) => {
      this.notifications.push(notification);
      // Set a timeout to remove the notification after a specific duration (e.g., 5 seconds).
      setTimeout(() => {
        this.removeNotification(notification);
      }, 5000); // 5000 milliseconds (5 seconds)
    });
  }
  getNotificationClass(type: NotificationType): string {
    switch (type) {
      case 'success':
        return 'bg-green-400 text-white';
      case 'error':
        return 'bg-red-400 text-white';
      case 'warning':
        return 'bg-yellow-400 text-black';
      case 'info':
        return 'bg-blue-400 text-white';
      default:
        return ''; // You can define a default style for other types or handle it as per your requirements.
    }
  }
  removeNotification(notification: {
    type: NotificationType;
    message: string;
  }) {
    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
}
