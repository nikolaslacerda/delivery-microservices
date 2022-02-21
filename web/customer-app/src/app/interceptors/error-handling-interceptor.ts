import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toaster: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(
        catchError(err => {
          let errorMessage = '';
          if (err.error instanceof ErrorEvent) {
            errorMessage = err.error.message;
          } else {
            if (err.status && err.message) {
              errorMessage = `[${err.status}] ${err.message}`;
            }
          }
          console.error(errorMessage);
          this.toaster.error(errorMessage, 'Erro no servidor');
          this.router.navigate(['']);
          return throwError(err);
        })
      );
  }

}
