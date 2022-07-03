import {
  createServiceFactory,
  SpectatorService
} from "@ngneat/spectator";
import {AuthGuard} from "./auth.guard";
import {ActivatedRouteSnapshot} from "@angular/router";
import {AppService} from "../services/app.service";

describe('AuthGuard', () => {
  let spectator: SpectatorService<AuthGuard>;
  const createService = createServiceFactory({
    service: AuthGuard,
    mocks: [AppService, ActivatedRouteSnapshot],
  });

  beforeEach(() => spectator = createService());

  it('should activate when user is logged', () => {
    const route: ActivatedRouteSnapshot = spectator.inject(ActivatedRouteSnapshot);
    const appService = spectator.inject(AppService);
    appService.isAuthenticated.andReturn(true);
    expect( spectator.service.canActivate(route)).toEqual(true);
  });

  it('should not activate when user is not logged', () => {
    const route: ActivatedRouteSnapshot = spectator.inject(ActivatedRouteSnapshot);
    const appService = spectator.inject(AppService);
    appService.isAuthenticated.andReturn(false);
    expect( spectator.service.canActivate(route)).toEqual(false);
  });
});

