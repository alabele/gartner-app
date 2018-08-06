import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        // tslint:disable-next-line:max-line-length
        Authorization: this.newMethod(),
      }
    });

    return next.handle(req);
  }

  private newMethod() {
    // tslint:disable-next-line:max-line-length
    return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMCIsInVuaXF1ZV9uYW1lIjoiaW50ZXJ2aWV3YXBpQGdhcnRuZXIuY29tIiwiZW1haWwiOiJpbnRlcnZpZXdhcGlAZ2FydG5lci5jb20iLCJuYmYiOjE1MzMwNjQyMjIsImV4cCI6MTU5MzA2NDE2MiwiaWF0IjoxNTMzMDY0MjIyfQ.M7Sqp47Zpq5_zqkxiLwZVCjpSiKpOL2CkwgFSo3V624`;
  }
}
