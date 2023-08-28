import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogUsersPage from './catalog-users';
import { mockFriend, mockUser, mockNotify } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus, AppRoute } from '../../const';

const mockStore = configureMockStore([thunk]);

const friends = Array.from({ length: 5 }, () => mockFriend());
const user = Array.from({ length: 5 }, () => mockUser());
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

describe('Component: CatalogUsersPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CatalogUsersPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(user[0].name)).toBeInTheDocument();
    expect(screen.getByTestId('users')).toBeInTheDocument();
  });
});
