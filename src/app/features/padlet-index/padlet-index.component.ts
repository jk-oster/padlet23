import {Component} from '@angular/core';
import {Padlet} from '../../models/padlet';
import {PadletService} from "../../core/padlet.service";
import {Utils} from "../../shared/utils";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'tw-padlet-card-index',
  templateUrl: './padlet-index.component.html',
  styles: []
})
export class PadletIndexComponent {
  padlets: Padlet[] = [];

  constructor(private padletService: PadletService, protected auth: AuthService) {
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
    this.padletService.updatePadlet(padlet.id, {
      name: name,
      description: padlet.description,
      cover: padlet.cover
    }).subscribe((padlet: Padlet) => {
      console.log(padlet);
    });
  }, 500);

  pIsPublic = (padlet: Padlet) => {
    // @ts-ignore
    return padlet.public == 1;
  }

  pIsOwner = (padlet: Padlet) => {
    // @ts-ignore
    return padlet.user_id == this.auth.user?.id;
  }

  pIsShared = (padlet: Padlet) => {
    // @ts-ignore
    return padlet.padlet_user?.find(u => u.id == this.auth.user?.id)?.accepted == 1;
  }

  pIsPrivate = (padlet: Padlet) => {
    // @ts-ignore
    return padlet.public == 0;
  }

}
