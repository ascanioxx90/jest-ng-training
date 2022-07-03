import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./components/user/user.component";
import {AuthGuard} from "./guards/auth.guard";
import {UserResolver} from "./resolvers/user.resolver";

const routes: Routes = [
  { path: 'users', resolve: {users: UserResolver}, canActivate: [AuthGuard], component: UserComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
