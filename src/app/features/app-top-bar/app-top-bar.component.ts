import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {ModalContainer} from "../../shared/modal-container";
import {AssocArray} from "../../shared/assoc-array";
import {Router} from "@angular/router";
import {InviteService} from "../../core/invite.service";
import {SearchService} from "../../core/search.service";

@Component({
  selector: 'tw-app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styles: []
})
export class AppTopBarComponent implements ModalContainer, OnInit {

  newInvite: boolean = false;
  toastText: string = 'You have a new invitation';

  constructor(
    protected auth: AuthService,
    protected router: Router,
    protected inviteService: InviteService,
    protected search: SearchService
  ) {
  }

  ngOnInit() {
    this.inviteService.startListeningForInvites();
    this.inviteService.newInvitationEvent.subscribe((data: any) => {
      console.log('Event received', data);
      this.toastText = `You have ${data} new invitations.`;
      this.showToast();
    });
  }

  showToast() {
    if (this.inviteService.invitesOpen) {
      this.newInvite = true;
    }
  }

  hideToast() {
    this.newInvite = false;
  }

  public hideToastAndOpenInvites() {
    this.hideToast();
    this.showModal('invites');
  }

  logout() {
    this.auth.logout().then((data) => {
      console.log(data);
      // redirect to home page
      this.router.navigate(['/']).then(r => console.log('logout: redirected to home page'));
    });
  }

  modals: AssocArray = {
    'invites': false,
  }

  showModal(name: string) {
    this.modals[name] = true;
  }

  closeModal(name: string) {
    this.modals[name] = false;
  }

}
