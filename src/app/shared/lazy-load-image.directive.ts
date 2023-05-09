import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[lazyLoadImg]',
})
export class LazyLoadDirective {
  @Input() lazyLoadImg: string = '';
  @HostBinding('src') srcAttr: string = '../../assets/placeholder.webp';

  constructor() {}

  ngOnInit() {
    const img = new Image();
    img.src = this.lazyLoadImg;
    img.onload = () => {
      this.srcAttr = this.lazyLoadImg;
    };
    img.onerror = () => {
      this.srcAttr = '../../assets/placeholder.webp';
    };
  }
}
