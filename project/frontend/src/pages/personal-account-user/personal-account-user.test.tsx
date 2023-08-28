import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import AccountUserPage from './personal-account-user';
import { mockTraining, mockUser, mockFriend, mockOrder, mockNotify } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const trainings = Array.from({ length: 5 }, () => mockTraining());
const user = Array.from({ length: 5 }, () => mockUser());
const friends = Array.from({ length: 5 }, () => mockFriend());
const orders = Array.from({ length: 5 }, () => mockOrder());
const notifications = Array.from({ length: 5 }, () => mockNotify());

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: user[1], hasErrorLogin: false,
    userData: null, UserInfo: user[1], isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: user, userOther: null, isUserOtherLoading: false, countUsers: 0
  },
  DATA_FRIENDS: {
    friends: friends, countFiends: 0, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false
  },
  DATA_TRAININGS: {
    trainings: trainings, countAllTrainings: { totalTrainings: 0, maxPrice: 0 },
    isLoadingCountAllTrainings: false, userTrainings: trainings, coachTrainings: trainings,
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false
  },
  DATA_ORDERS: {
    orders: orders, order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0
  },
  DATA_NOTIFY: {
    notifications: notifications, hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false
  }
});

describe('Component: AccountUserPage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <AccountUserPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Личный кабинет/i)).toBeInTheDocument();
  });
});
