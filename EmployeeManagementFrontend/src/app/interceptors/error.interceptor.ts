import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SnacbarService } from '../services/snacbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackbar = inject(SnacbarService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      snackbar.error(err.error.title || err.error)
      return throwError(() => err)
    })
  );
};
