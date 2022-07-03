import {SpectatorService, createServiceFactory} from '@ngneat/spectator';
import {of, throwError} from "rxjs";
import {UserResolver} from "./user.resolver";
import {UserService} from "../services/user.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

describe('UserResolver', () => {
  let spectator: SpectatorService<UserResolver>;
  const createService = createServiceFactory({
    service: UserResolver,
    mocks: [UserService, ActivatedRouteSnapshot, RouterStateSnapshot],
  });

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should resolve 4 users when no errors occur', (done) => {
    const userService = spectator.inject(UserService);
    const route: ActivatedRouteSnapshot = spectator.inject(ActivatedRouteSnapshot);
    const snapshot: RouterStateSnapshot = spectator.inject(RouterStateSnapshot);

    userService.getUsers.andReturn(of(['STEFANO', 'AURORA', 'DANIELA', 'TOTO']));
    spectator.service.resolve(route, snapshot).subscribe(res => {
      expect(res).toEqual(['STEFANO', 'AURORA', 'DANIELA', 'TOTO'])
      done();
    });
  });

  it('should resolve an empty array when errors occur', (done) => {
    const userService = spectator.inject(UserService);
    const route: ActivatedRouteSnapshot = spectator.inject(ActivatedRouteSnapshot);
    const snapshot: RouterStateSnapshot = spectator.inject(RouterStateSnapshot);

    userService.getUsers.andReturn( throwError(() => new Error()));
    spectator.service.resolve(route, snapshot).subscribe(res => {
      expect(res).toEqual([])
      done();
    });
  });
});
