import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import UserCardPage from './user-card';
import { mockTraining, mockUser, mockComment, mockOrder, mockUserCoach } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, AppRoute } from '../../const';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const training = Array.from({ length: 4 }, () => mockTraining());
const user = mockUser();
const userOther = mockUserCoach();
const comments = Array.from({ length: 5 }, () => mockComment());
const orders = Array.from({ length: 5 }, () => mockOrder());

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: user, hasErrorLogin: false,
    userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: user, userOther: userOther, isUserOtherLoading: false, countUsers: 0
  },
  DATA_FRIENDS: {
    friends: [], countFiends: 0, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false
  },
  DATA_TRAININGS: {
    trainings: [], countAllTrainings: { totalTrainings: 0, maxPrice: 0 },
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: training,
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false
  },
  DATA_NOTIFY: {
    notifications: [], hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false
  },
  DATA_COMMENT: { comments: comments, isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false },
  DATA_ORDERS: {
    orders: orders, order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0
  },
  DATA_SUBSCRIBE: { hasErrorPost: false, hasErrorDelete: false, isSubscrLoadPost: false, isSubscrLoadDelete: false },
  DATA_REQUEST: { hasErrorPost: false, hasErrorDelete: false, isLoadPost: false, isLoadDelete: false }
});

describe('Component: UserCardPage', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserCardPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Карточка пользователя/i)).toBeInTheDocument();
    expect(screen.getByText(userOther.name)).toBeInTheDocument();
    expect(screen.getByText(userOther.location)).toBeInTheDocument();
  });

});
