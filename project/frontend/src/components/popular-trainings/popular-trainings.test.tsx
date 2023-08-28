import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PopularTrainings from './popular-trainings';
import { mockTraining } from '../../mocks/mocks';

const mockStore = configureMockStore();
const trainings = Array.from({ length: 5 }, () => mockTraining());
const history = createMemoryHistory();

const store = mockStore({
  DATA_TRAININGS: {
    trainings: trainings, countAllTrainings: { totalTrainings: 0, maxPrice: 0 },
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false
  },
});

describe('Component: PopularTrainings', () => {
  it('should render "PopularTrainings"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopularTrainings
              trainings={trainings}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();

  });
});
