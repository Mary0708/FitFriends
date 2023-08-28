import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import SpecialForYou from './special-for-you';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
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

describe('Component: SpecialForYou', () => {
  it('should render "SpecialForYou"', () => {

    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <HelmetProvider>
            <SpecialForYou />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Специально подобрано для вас/i)).toBeInTheDocument();
  });
});
