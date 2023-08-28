import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, AppRoute} from '../../const';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { mockUser } from '../../mocks/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const user = mockUser();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: user, hasErrorLogin: false,
    userData: null, UserInfo: [], isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0},
  DATA_NOTIFY: {notifications: [], hasErrorDeleteNotify: false, isNotifyLoad: false, isNotifyLoadDelete: false}
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Header />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('handleMainClick')).toBeInTheDocument();
  });

});
