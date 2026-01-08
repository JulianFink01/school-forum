import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(1),
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse &&
            (event.status === 201 || event.status === 200 || event.status === 204) &&
            (request.method === 'POST' || request.method === 'PUT')) {
            this.snackBar.open('Operation done successfully', 'Close', {
              duration: 2000,
              panelClass: ['success-snackbar']
            });
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage;

          if (error.error instanceof ErrorEvent) {
            errorMessage = `${error.error.message}`;
          } else {
            errorMessage = `${error.message}`;
          }
          if (error.status === 500) {
            errorMessage = 'No Data was provided yet!';
          }

          this.snackBar.open(errorMessage, 'Close', {
            duration: 2000,
            panelClass: ['error-snackbar']
          });

          return throwError(errorMessage);
        })
      );

  }
}
