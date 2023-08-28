import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import UserItem from './user-item';
import { mockUser } from '../../mocks/mocks';
import { AuthorizationStatus, AppRoute } from '../../const';

const mockStore = configureMockStore();
const user = mockUser();
const history = createMemoryHistory();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: user, hasErrorLogin: false,
    userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0
  },
});

describe('Component: UserItem', () => {
  it('should render "UserItem"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserItem
              user={user}
              isMainPage={false}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.location)).toBeInTheDocument();

  });
});
