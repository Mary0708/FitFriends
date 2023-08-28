import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import SpecialOffers from './special-offers';
import { mockTraining} from '../../mocks/mocks';

const mockStore = configureMockStore();
const trainings = Array.from({length: 5}, () => mockTraining());

const store = mockStore({
  DATA_TRAININGS: {trainings: trainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
});

describe('Component: SpecialOffers', () => {
  it('should render "SpecialOffers"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <SpecialOffers
              specialTrainings={trainings}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole(/Специальные предложения/i)).toBeInTheDocument();

  });
});
