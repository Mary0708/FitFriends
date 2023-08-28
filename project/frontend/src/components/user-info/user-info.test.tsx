import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import UserInfo from './user-info';
import { mockUser } from '../../mocks/mocks';
import { AuthorizationStatus, AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';

const mockStore = configureMockStore([thunk]);
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

describe('Component: UserInfo', () => {
  it('should render "UserInfo"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserInfo
              user={user}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Обо мне/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(user.name)).toHaveAttribute('name', 'name');
    expect(screen.getByDisplayValue(user.description)).toHaveAttribute('name', 'description');
  });
});
