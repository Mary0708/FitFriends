import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PopupCertificates from './popup-certificates';
import { mockUserCoach } from '../../mocks/mocks';
import { AuthorizationStatus, AppRoute } from '../../const';

const mockStore = configureMockStore();
const userCoach = mockUserCoach();
const history = createMemoryHistory();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: userCoach, hasErrorLogin: false,
    userData: null, UserInfo: userCoach, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0
  },
});

describe('Component: PopupCertificates', () => {
  it('should render "PopupCertificates"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PopupCertificates
              coachInfo={userCoach}
              onClose={jest.fn()}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Сертификаты/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();

  });
});
