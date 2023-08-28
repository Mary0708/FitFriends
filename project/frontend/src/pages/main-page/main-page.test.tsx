import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import MainPage from './main-page';
import { mockTraining, mockUser, mockFriend, mockOrder, mockComment, mockNotify } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus, AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';

const mockStore = configureMockStore([thunk]);

const trainings = Array.from({ length: 5 }, () => mockTraining());
const user = Array.from({ length: 5 }, () => mockUser());
const friends = Array.from({ length: 5 }, () => mockFriend());
const orders = Array.from({ length: 5 }, () => mockOrder());
const comments = Array.from({ length: 5 }, () => mockComment());
const notifications = Array.from({ length: 5 }, () => mockNotify());
const history = createMemoryHistory();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: user[1], hasErrorLogin: false,
    userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
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
  DATA_COMMENT: { comments: comments, isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false },
  DATA_NOTIFY: {
    notifications: notifications, hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false
  }
});

jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});
describe('Component: MainPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Время находить тренировки, спортзалы и друзей спортсменов/i)).toBeInTheDocument();
    expect(screen.getByTestId('for_you')).toBeInTheDocument();
    expect(screen.getByTestId('special')).toBeInTheDocument();
    expect(screen.getByTestId('popular')).toBeInTheDocument();
    expect(screen.getByTestId('look')).toBeInTheDocument();
  });

});
