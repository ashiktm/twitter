import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService) {}

  handleHttpError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Something went wrong please try again later`;

      // Handle different HTTP error status codes
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request';
          break;
        case 401:
          errorMessage = 'Unauthorized Access';
          // Perform additional actions for unauthorized access (e.g., redirect to login page)
          break;
        case 403:
          errorMessage = 'Forbidden';
          // Perform additional actions for forbidden access (e.g., show access denied page)
          break;
        case 404:
          errorMessage = 'Resource Not Found';
          // Perform additional actions for not found resources (e.g., show custom error page)
          break;
        // Add more cases as needed for other status codes
        case 500:
          errorMessage = 'Something went wrong';
          // Perform additional actions for not found resources (e.g., show custom error page)
          break;
        // Add more cases as needed for other status codes
      }
    }
    this.notificationService.showNotification('error', errorMessage);
    // Optionally, log the error or perform additional actions here
    console.error(errorMessage);

    // Pass the error message along with the error
    return throwError(() => new Error(errorMessage));
  }
}
