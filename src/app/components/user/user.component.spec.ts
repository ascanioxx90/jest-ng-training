import {Spectator, createRoutingFactory, byText} from '@ngneat/spectator';
import {UserComponent} from "./user.component";
import {UserResolver} from "../../resolvers/user.resolver";

describe('UserComponent', () => {
  let spectator: Spectator<UserComponent>;
  const createComponent = createRoutingFactory({
    component: UserComponent,
    data: {users: ['Stefano', 'Aurora', 'Daniela', 'Toto']},
    mocks: [UserResolver]
  });

  beforeEach(() => spectator = createComponent());

  it('should exist', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should render 4 users as list item', () => {
    const result = ['Stefano', 'Aurora', 'Daniela', 'Toto'];
    spectator.fixture.detectChanges();
    spectator
      .queryAll('li')
      .map(li => li.textContent)
      .forEach( (li, index) => expect(li).toBe(result[index]));
  });
});
