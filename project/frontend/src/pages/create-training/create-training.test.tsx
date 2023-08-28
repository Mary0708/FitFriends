import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import CreateTrainingPage from './create-training';
import { mockUser } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const user = Array.from({ length: 5 }, () => mockUser());

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: user[1], hasErrorLogin: false,
    userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: user, userOther: null, isUserOtherLoading: false, countUsers: 0
  },
  DATA_TRAININGS: {
    trainings: [], countAllTrainings: { totalTrainings: 0, maxPrice: 0 },
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false
  },
  DATA_NOTIFY: {
    notifications: [], hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false
  }
});

describe('Component: CreateTrainingPage', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CreateTrainingPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    await userEvent.type(screen.getByTestId('title'), 'New training');
    await userEvent.type(screen.getByTestId('price'), '5000');

    expect(screen.getByText(/Создание тренировки/i)).toBeInTheDocument();
  });
});
