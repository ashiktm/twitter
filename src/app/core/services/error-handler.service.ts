import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleHttpError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

      // Handle different HTTP error status codes
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request';
          break;
        case 401:
          errorMessage = 'Unauthorized';
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

    // Optionally, log the error or perform additional actions here
    console.error(errorMessage);

    // Pass the error message along with the error
    return throwError(() => new Error(errorMessage));
  }
}
