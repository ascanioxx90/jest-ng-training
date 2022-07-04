import {SpectatorService, createServiceFactory} from '@ngneat/spectator';
import {AppService} from "./app.service";

describe('AppService', () => {
  let spectator: SpectatorService<AppService>;
  const createService = createServiceFactory(AppService);

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should not be logged in without token', () => {
    expect(spectator.service.isAuthenticated()).toBeFalsy();
  });

  it('should be logged with token', () => {
    window.localStorage.setItem('token', 'FAKE_TOKEN');
    expect(spectator.service.isAuthenticated()).toBeTruthy();
  });
});
