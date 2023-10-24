import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export type NotificationType = 'success' | 'error' | 'warning' | 'info';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  isFailure: boolean = false;
  message: string = '';

  private notificationSubject = new Subject<{
    type: NotificationType;
    message: string;
  }>();

  get notifications() {
    return this.notificationSubject.asObservable();
  }
  showNotification(type: NotificationType, message: string) {
    this.notificationSubject.next({ type, message });
  }
}
