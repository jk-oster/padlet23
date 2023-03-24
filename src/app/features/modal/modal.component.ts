import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Required} from "../../shared/required";

@Component({
  selector: 'tw-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent {
  @Output() modalCloseEvent = new EventEmitter<string>();

  @Input() @Required() modalName: string = '';
  @Input() modalTitle: string = '';
  @Input() modalFooterContent: any;
  @Input() modalHeaderContent: any;
  @Input() modalFooter: boolean = true;
  @Input() modalClass: string = '';
  @Input() modalClose: boolean = true;
  @Input() modalCloseText: string = 'Close';
  @Input() modalCloseClass: string = 'btn btn-outline btn-sm btn-secondary';
  @Input() modalMobileBottomOfScreen: boolean = true;
  @Input() closeOnClickOutside: boolean = true;

  onClose() {
    this.modalCloseEvent.emit(this.modalName);
  }
  onClickOutside() {
    if(this.closeOnClickOutside) {
      this.onClose();
    }
  }
}
