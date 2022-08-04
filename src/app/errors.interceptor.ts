import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status == 401) {
            console.log("INTERCETTATO 401");
            this.auth.logout()
            return throwError(()=>new Error("TOKEN ERRATO"))
          }
          if(err.status == 404) {
            return throwError(()=>new Error("INDIRIZZO ERRATO"))
          }
        }
        return throwError(()=>new Error("ERRORE INTERCETTATO"))
      })
    );
    
  }
}
