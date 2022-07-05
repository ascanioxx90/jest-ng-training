import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<string[]> {
    return this.httpClient.get<string[]>('api/users').pipe(map((users: string[]) => users.map(user => user.toUpperCase())));
  }
}
