import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users$: Observable<string[]>;

  constructor(private route: ActivatedRoute) {
    this.users$ = route.data.pipe(map( data => data.users));
  }
}
