/**
 * @author XIaoCongHu
 * @createTime 2018/9/20
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(private $router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<| HttpHeaderResponse | HttpResponse<any>> {
    const req = request.clone({setHeaders: {Authorization: '123456'}});
    return next.handle(req).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }

  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      case 401:
        console.log('你尚未登录');
        this.$router.navigate(['/index/login']);
        break;
      case 404:
        console.log('地址错误');
        break;
      case 500:
        console.log('服务器错误');
        break;
      default:
        console.log('网络异常了');
    }
    return of(event);
  }
}

