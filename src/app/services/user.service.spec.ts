import {SpectatorService, createServiceFactory} from '@ngneat/spectator';
import {UserService} from "./user.service";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";

describe('UserService', () => {
  let spectator: SpectatorService<UserService>;
  const createService = createServiceFactory({
    service: UserService,
    mocks: [HttpClient],
  });

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should get 4 users on getUsers invocation', (done) => {
    const http = spectator.inject(HttpClient);
    http.get.andReturn(of(['Stefano', 'Aurora', 'Daniela', 'Toto']));
    spectator.service.getUsers().subscribe(res => {
      expect(res).toHaveLength(4);
      done();
    });
  });

  it('should get users in uppercase on getUsers invocation', (done) => {
    const http = spectator.inject(HttpClient);
    http.get.andReturn(of(['Stefano', 'Aurora', 'Daniela', 'Toto']));
    spectator.service.getUsers().subscribe(res => {
      expect(res).toEqual(['STEFANO', 'AURORA', 'DANIELA', 'TOTO'])
      done();
    });
  });
});
