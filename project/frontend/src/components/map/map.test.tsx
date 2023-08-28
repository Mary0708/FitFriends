import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import MapView from './map';
import { mockUser } from '../../mocks/mocks';
import { AuthorizationStatus, AppRoute, POINT_ARR } from '../../const';

const mockStore = configureMockStore();
const user = mockUser();
const history = createMemoryHistory();
const currentPoint = POINT_ARR[Math.floor(Math.random() * POINT_ARR.length)];

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: user, hasErrorLogin: false,
    userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0
  },
});

describe('Component: MapView', () => {
  it('should render "MapView"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MapView
              position={currentPoint.location}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();

  });
});
