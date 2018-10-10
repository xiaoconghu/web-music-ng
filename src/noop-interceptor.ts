/**
 * @author gyjlovelh
 * @createTime 2017/10/8
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, mergeMap} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(
    private $router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<| HttpHeaderResponse | HttpResponse<any>> {
    const req = request.clone({setHeaders: {Authorization: '123456'}});
    return next.handle(req).pipe(mergeMap((event: any) => {
        // 正常返回，处理具体返回参数
        if (event instanceof HttpResponse && event.status === 200) {
          return this.handleData(event); // 具体处理请求返回数据
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)));
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {
          const body: any = event.body;
          if (body && body.rc === 3) {
          }
        }
        break;
      case 401: // 未登录状态码
        break;
      case 404:
      case 500:
        break;
      default:
        return of(event);
    }
  }
}

