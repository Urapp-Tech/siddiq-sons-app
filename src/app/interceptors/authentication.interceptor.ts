import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, catchError, map, tap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const { userData } = this.userService;
    if (userData) {
      const modifiedRequest = this.attachToken(request, userData.token);
      return next.handle(modifiedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (
            error.error.statusCode === 500 &&
            (error.error.message.includes(`(reading 'tenantId')`) ||
              error.error.message.includes(`(reading 'tenant')`))
          ) {
            this.userService.logout();
            return EMPTY;
          }
          return throwError(() => error);
        }),
        map((event: HttpEvent<any>) => event)
      );
    }
    return next.handle(request).pipe(
      tap((response: any) => {
        if (
          response.status === 200 &&
          response.body.message.includes(`tenant does not exist`)
        ) {
          this.userService.logout();
        }
      })
    );
  }

  attachToken(
    request: HttpRequest<any>,
    accessToken: string
  ): HttpRequest<any> {
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', accessToken),
    });
    return modifiedRequest;
  }
}
