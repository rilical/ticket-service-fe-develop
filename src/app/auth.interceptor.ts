import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {StorageService} from './shared/services/storage.service';
import {environment} from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private storageService: StorageService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  

    if (this.storageService.getUserToken()) {
      req = req.clone({
        setHeaders: {
          'Authorization': "Bearer " + this.storageService.getUserToken(),
        }
      });

    }
    return next.handle(req).pipe(tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse)
        {
          console.log(err);
          if (err?.status == 401) {
            location.href = environment.sso.ssoFormIp                
          }         
        }
      }));
  }

  isAdmin(): boolean {
    return (location.href.search("admin") != -1);
  }
}
