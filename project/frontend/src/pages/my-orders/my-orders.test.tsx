import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import MyOrdersPage from './my-orders';
import { mockTraining, mockUser, mockOrder } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, AppRoute } from '../../const';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const trainings = Array.from({ length: 5 }, () => mockTraining());
const user = Array.from({ length: 5 }, () => mockUser());
const orders = Array.from({ length: 5 }, () => mockOrder());

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: user[1], hasErrorLogin: false,
    userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: user, userOther: null, isUserOtherLoading: false, countUsers: 0
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
    notifications: [], hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false
  }
});

jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});

describe('Component: MyOrdersPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MyOrdersPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Мои заказы/i)).toBeInTheDocument();
    expect(screen.getByTestId('orders')).toBeInTheDocument();
  });

});
