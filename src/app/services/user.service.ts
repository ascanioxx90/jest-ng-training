import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<string[]>('api/users').pipe(map((users: string[]) => users.map(user => user.toUpperCase())));
  }
}
