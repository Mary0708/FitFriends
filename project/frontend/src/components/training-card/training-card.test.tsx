import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { mockTraining} from '../../mocks/mocks';
import TrainingCard from './training-card';

const mockStore = configureMockStore();
const training = mockTraining();

const store = mockStore({
  DATA_TRAININGS: {trainings: [training],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
});

describe('Component: TrainingItem', () => {
  it('should render "TrainingItem"', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TrainingCard
              training={training}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(training.trainingType ? `#${training.trainingType}` : '')).toBeInTheDocument();
    expect(screen.getByText(training.title ? training.title : '')).toBeInTheDocument();

  });
});
