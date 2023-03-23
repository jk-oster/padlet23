import {Component, Input} from '@angular/core';
import {Padlet} from '../../models/padlet';
import {PadletService} from "../../core/padlet.service";
import {Utils} from "../../shared/utils";

@Component({
  selector: 'tw-padlet-card-index',
  templateUrl: './padlet-index.component.html',
  styles: []
})
export class PadletIndexComponent {
  padlets: Padlet[] = [];

  constructor(private padletService: PadletService) {
    this.padletService = padletService;
    padletService.getPadlets().subscribe((padlets: Padlet[]) => {
      this.padlets = padlets;
    });
  }

  updatePadlet = (padlet: Padlet, event: any) => {
    this.debouncedUpdatePadlet(padlet, event);
  }

  debouncedUpdatePadlet = Utils.debounce((padlet: Padlet, event: any) => {
    const name = event.target.value;
    this.padletService.updatePadlet(padlet.id, name, padlet.description, padlet.cover).subscribe((padlet: Padlet) => {
      console.log(padlet);
    });
  }, 500);

}
