import {Directive, ViewContainerRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[teleport]'
})
export class TeleportDirective implements OnInit {
  @Input() teleport: string = 'body';

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if(!this.teleport) {
      this.teleport = 'body';
    }
    const target = document.querySelector(this.teleport);
    if (target) {
      target.appendChild(this.viewContainerRef.element.nativeElement);
    }
  }
}
