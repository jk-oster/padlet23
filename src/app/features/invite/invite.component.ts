import {Component, OnInit} from '@angular/core';
import {InviteService} from "../../core/invite.service";
import {PadletUser} from "../../models/padlet-user";

@Component({
  selector: 'tw-invite',
  templateUrl: './invite.component.html',
  styles: []
})
export class InviteComponent implements OnInit {

  constructor(protected inviteService: InviteService) {
  }

  ngOnInit(): void {
    this.inviteService.getInvites();
  }

  acceptInvite(invite: any) {
    this.inviteService.acceptInvite(invite);
  }

  declineInvite(invite: any) {
    this.inviteService.declineInvite(invite);
  }

  public pIsAcceptInvite(invite: any) {
    return invite.pivot.accepted === true || invite.pivot.accepted === 1;
  }

  public getLink(invite: any) {
    return `/padlet/${invite.pivot.padlet_id}`;
  }

  public getPermissionText(invite: PadletUser): string {
    const permissionsMapping = {
      1: 'View',
      2: 'Comment',
      3: 'Edit',
      4: 'Admin'
    }

    // @ts-ignore
    return permissionsMapping[invite.pivot.permission_level] ?? 'Unknown';
  }

}
