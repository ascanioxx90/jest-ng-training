import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UserService} from "../services/user.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<string[]> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
    return this.service.getUsers().pipe(catchError((_) => of([])));
  }
}
