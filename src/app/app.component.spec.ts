import {Spectator, createComponentFactory, byText} from '@ngneat/spectator';
import {AppComponent} from "./app.component";
import {Router} from "@angular/router";

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [Router]
  });

  beforeEach(() => spectator = createComponent());

  it('should exist', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should have a default name', () => {
    expect(spectator.component.name).toBe('jest-training');
  });

  it('should output a <p> with "Name: {{ defaultName }}!"', () => {
    spectator.fixture.detectChanges();
    expect(spectator.query('p')?.innerHTML).toBe('Name: jest-training!');
  });

  it('should output a <p> with "Name: Jest!"', () => {
    spectator.component.name = 'Jest';
    spectator.fixture.detectChanges();
    expect(spectator.query('p')?.innerHTML).toBe('Name: Jest!');
  });

  it('should output a <button> with "Go to Users List"', () => {
    spectator.fixture.detectChanges();
    expect(spectator.query('button')?.innerHTML).toBe('Show Users');
  });

  it('should redirect to users page on <button> "Go to Users List" click ', async () => {
    const router = spectator.inject<Router>(Router);
    spectator.fixture.detectChanges();
    spectator.click(byText('Show Users'));
    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });
});
