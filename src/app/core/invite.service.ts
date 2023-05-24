import {Injectable} from '@angular/core';
import {catchError, Observable, retry, Subject, throwError} from "rxjs";
import {PadletUser} from "../models/padlet-user";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  padletUsers: PadletUser[] = [];
  private newInvitationEventSubject = new Subject<any>();
  public newInvitationEvent = this.newInvitationEventSubject.asObservable();

  public get currentPadletUsers(): PadletUser[] {
    return this.padletUsers ?? [];
  }

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  startListeningForInvites() {
    setInterval(() => {
      if (this.auth.isAuthenticated) {
        const currentInviteNumber = Number(localStorage.getItem('inviteNumber')) ?? 0;
        this.getInvites().subscribe(() => {
          const newInviteNumber = this.padletUsers.length;
          if (currentInviteNumber < newInviteNumber) {
            this.newInvitationEventSubject.next(currentInviteNumber - newInviteNumber);
          }
          localStorage.setItem('inviteNumber', newInviteNumber.toString());
        });
      }
    }, 1000 * 30);
  }

  getInvites(): Observable<PadletUser[]> {
    const observable = this.http.get<PadletUser[]>('/padlet-user')
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
    observable.subscribe((padletUsers: PadletUser[]) => {
      this.padletUsers = padletUsers;
      console.log(this.padletUsers);
    });
    return observable;
  }

  getOpenInvites() {
    return this.padletUsers.filter((padletUser: PadletUser) => {
      return padletUser.pivot.accepted === 0;
    });
  }

  public get invitesOpen(): boolean {
    return this.getOpenInvites().length > 0;
  }

  acceptInvite(invite: PadletUser): Observable<PadletUser> {
    const observable = this.http.put<PadletUser>(`/padlet-user/${invite.id}`, {})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
    observable.subscribe((data: PadletUser) => {
      console.log(data);

      this.padletUsers = this.padletUsers.filter((padletUser: PadletUser) => {
        return padletUser.id !== invite.id;
      });

      this.padletUsers.push(data);

      console.log('my current invites', this.padletUsers);
    });
    return observable;
  }

  declineInvite(invite: PadletUser): Observable<any> {
    const observable = this.http.delete<any>(`/padlet-user/${invite.id}`, {})
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
    observable.subscribe((data: any) => {
      console.log(data);
      this.padletUsers = this.padletUsers.filter((padletUser: PadletUser) => {
        return padletUser.id !== invite.id;
      });
    });
    return observable;
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
