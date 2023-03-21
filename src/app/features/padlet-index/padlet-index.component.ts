import {Component, Input} from '@angular/core';
import {Padlet} from '../../models/padlet';
import {PadletService} from "../../core/padlet.service";

@Component({
  selector: 'tw-padlet-card-index',
  templateUrl: './padlet-index.component.html',
  styles: []
})
export class PadletIndexComponent {
  padlets: Padlet[] = [];

  constructor(private padletService: PadletService) {
    padletService.getPadlets().subscribe((padlets: Padlet[]) => {
      this.padlets = padlets;
    });
  }
}
