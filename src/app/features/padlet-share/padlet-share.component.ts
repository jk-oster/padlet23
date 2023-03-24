import {Component, Input, OnInit} from '@angular/core';
import {PadletUser} from "../../models/padlet-user";
import {Padlet} from "../../models/padlet";
import {Required} from "../../shared/required";
import {User} from "../../models/user";
import {AuthService} from "../../core/auth.service";
import {Utils} from "../../shared/utils";
import {AssocArray} from "../../shared/assoc-array";
import {PadletService} from "../../core/padlet.service";

@Component({
  selector: 'tw-padlet-share',
  templateUrl: './padlet-share.component.html',
  styles: []
})
export class PadletShareComponent implements OnInit {

  @Input() @Required() padlet: Padlet | undefined = undefined;
  public padletUser: PadletUser[] = [];
  public possibleUsers: User[] = [];
  public permissionLevel: number = 0;

  constructor(protected auth: AuthService, private padletService: PadletService) {

  }

  ngOnInit(): void {
    this.padletUser = this.padlet?.padlet_user ?? [];
  }

  searchUser = (event: any) => {
    this.debouncedSearchUser(event);
  }

  debouncedSearchUser = Utils.debounce((event: any) => {
    const searchTerm = event.target.value;
    if(searchTerm.length >= 1) {
      this.auth.searchUsers(searchTerm).subscribe((users: User[]) => {
        this.possibleUsers = users;
      });
    }
    else {
      this.possibleUsers = [];
    }
  }, 500);

  get possibleUsersExceptPadletUsers(): User[] {
    return this.possibleUsers?.filter(user => {
      return !this.padletUser.some(padletUser => padletUser.id === user.id);
    }) ?? [];
  }

  get currentPadletUsers(): PadletUser[] {
    return this.padletUser ?? [];
  }

  addPadletUser(user: User) {
    console.log('addPadletUser', user);
    if(this.permissionLevel > 0) {
      this.padletUser.push({
        id: user.id,
        name: user.name,
        pivot: {
          permission_level: this.permissionLevel,
          padlet_id: this.padlet?.id ?? 0,
          user_id: user.id,
          accepted: 0,
        },
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
      const mappedUserPermissions = this.padletUser.map(user => {
        return {
          user_id: user.id,
          permission_level: this.permissionLevel
        }
      });
      if (this.padlet) {
        this.padletService.sharePadlet(this.padlet, mappedUserPermissions).subscribe();
      }
    }
  }

  removePadletUser(padletUser: PadletUser) {
    console.log('removePadletUser', padletUser);
    this.padletUser = this.padletUser.filter(user => user.id !== padletUser.id);
    const mappedUserPermissions = this.padletUser.map(user => {
      return {
        user_id: user.id,
        permission_level: user.pivot.permission_level
      }
    });
    if (this.padlet) {
      this.padletService.sharePadlet(this.padlet, mappedUserPermissions).subscribe();
    }
  }

  getPermissionLevel(user: PadletUser): string {
    const PermissionLevels: AssocArray = {
      4: 'Admin',
      3: 'Edit',
      2: 'Comment',
      1: 'View'
    }
    return PermissionLevels[Number(user.pivot.permission_level)];
  }

}
