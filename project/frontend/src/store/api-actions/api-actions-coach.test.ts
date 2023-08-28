import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { APIRoute } from '../../const';
import { createAPI } from '../../services/api';
import { mockUserData, mockUser } from '../../mocks/mocks';
import { registerCoach } from './api-actions-coach';
import { checkAuthAction, fetchUser, fetchUserCatalog } from './api-actions-user';
import { State } from '../../types/state';
import { LevelTraining, TrainingTime } from '../../types/training';
import { Gender, UserRole } from '../../types/user';
import { Location } from '../../types/location';

const createUser = { name: '', email: '', password: '', gender: Gender.None, dateBirth: '', role: UserRole.Coach,
description: '', location: Location.Pionerskaya, levelTraining: LevelTraining.Beginner,
trainingType: [], isPersonal: false, trainingTime: TrainingTime.Time30, successCoach: '',
caloriesReset: 0, isReady: false};

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(registerCoach(createUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_User when GET /user', async () => {
    const user = mockUserData();
    mockAPI
      .onGet(APIRoute.CheckUser)
      .reply(200, user);

    const store = mockStore();

    await store.dispatch(fetchUser());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchUser.pending.type,
      fetchUser.fulfilled.type
    ]);
  });

  it('should dispatch Load_Users when GET /users', async () => {
    const users = Array.from({length: 5}, () => mockUser());
    mockAPI
      .onGet(APIRoute.Users)
      .reply(200, users);

    const store = mockStore();

    await store.dispatch(fetchUserCatalog());
    console.log(store)
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchUserCatalog.pending.type,
      fetchUserCatalog.fulfilled.type
    ]);
  });
});
