import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private toaster: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        retry(1),
        catchError((err: HttpErrorResponse) => {
          let errorMessage: string;
          if (err.error instanceof ErrorEvent) {
            errorMessage = err.error.message;
          } else {
            errorMessage = err.message;
          }
          this.toaster.error(errorMessage, 'Error ' + err.status, {
            timeOut: 10000,
          });
          return throwError(err);
        })
      );
  }

}
