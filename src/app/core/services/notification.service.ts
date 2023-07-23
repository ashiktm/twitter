import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  showNotification: boolean = false;
  isFailure: boolean = false;
  message: string = '';

  showSuccess(message: string) {
    this.isFailure = false;
    this.message = message;
    this.showNotification = true;
    this.hideNotificationAfterDelay();
  }

  showFailure(message: string) {
    this.isFailure = true;
    this.message = message;
    this.showNotification = true;
    this.hideNotificationAfterDelay();
  }

  private hideNotificationAfterDelay() {
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
