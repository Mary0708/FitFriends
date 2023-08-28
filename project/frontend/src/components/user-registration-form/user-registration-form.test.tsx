import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import UserRegistrationForm from './user-registration-form';
import {mockUser} from '../../mocks/mocks';
import { AuthorizationStatus, AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { Location } from '../../types/location';

const mockStore = configureMockStore([thunk]);
const user = mockUser();
const history = createMemoryHistory();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: user, hasErrorLogin: false,
    userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0},
});

describe('Component: UserRegistrationForm', () => {
  it('should render "UserRegistrationForm"', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <UserRegistrationForm
              onSubmit={jest.fn()}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBe(Object.values(Location).length);

    await userEvent.type(screen.getByTestId('mail'), 'mail@mail.ru');
    await userEvent.type(screen.getByTestId('password'), '123456ab');

    expect(screen.getByDisplayValue(/mail@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456ab/i)).toBeInTheDocument();
  });
});
