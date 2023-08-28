import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../../types/state.js';
import { APIRoute } from '../../const.js';
import { createAPI } from '../../services/api.js';
import { mockTraining } from '../../mocks/mocks.js';
import { fetchCoachTrainings } from './api-actions-trainings.js';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch Load_Users when GET /trainings', async () => {
    const mockTrainings = Array.from({length: 5}, () => mockTraining());
    mockAPI
      .onGet(APIRoute.CoachTraining)
      .reply(200, mockTrainings);

    const store = mockStore();

    await store.dispatch(fetchCoachTrainings());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCoachTrainings.pending.type,
      fetchCoachTrainings.fulfilled.type
    ]);
  });
});
