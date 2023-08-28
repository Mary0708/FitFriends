import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { mockUser } from '../../mocks/mocks';
import CertificateCard from './certificate-card';

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

describe('Component: CertificateCard', () => {
  it('should render "CertificateCard"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CertificateCard
              certificateId={user.certificatesPath[0].certificateId}
              certificatePath={user.certificatesPath[0].certificatePath}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('object')).toBeInTheDocument();

  });
});


