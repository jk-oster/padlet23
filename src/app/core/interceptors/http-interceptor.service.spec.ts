import { HttpInterceptorService } from './http-interceptor.service';

describe('MyInterceptor', () => {
  it('should create an instance', () => {
    expect(new HttpInterceptorService()).toBeTruthy();
  });
});
