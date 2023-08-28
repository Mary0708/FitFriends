import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { mockTraining, mockUser, mockComment, mockOrder } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, AppRoute } from '../../const';
import TrainingCardCoach from './training-card-coach';

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();
const training = mockTraining();
const user = mockUser();
const name = training.title ? training.title : ' ';

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: user, hasErrorLogin: false,
    userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: user, userOther: null, isUserOtherLoading: false, countUsers: 0
  },
  DATA_TRAININGS: {
    trainings: [], countAllTrainings: { totalTrainings: 0, maxPrice: 0 },
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: training,
    hasErrorPost: false, isLoadingPostTraining: false
  },
});

describe('Component: TrainingCardPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TrainingCardCoach />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Карточка тренировки/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(name)).toHaveAttribute('name', 'title');
  });

});
