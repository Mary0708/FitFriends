import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import QuestionnaireCoachForm from './questionnaire-coach-form';
import { mockUser, mockCreateUser } from '../../mocks/mocks';
import { AuthorizationStatus, AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-route/history-route';

const mockStore = configureMockStore([thunk]);
const user = mockUser();
const userGeneral = mockCreateUser();
const history = createMemoryHistory();
const file = new File([new ArrayBuffer(1)], 'file.jpg');

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth, authInfo: user, hasErrorLogin: false,
    userData: userGeneral, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0
  },
});

describe('Component: QuestionnaireCoachForm', () => {
  it('should render "QuestionnaireCoachForm"', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <QuestionnaireCoachForm
              createUser={userGeneral}
              avatarImg={file}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Опросник/i)).toBeInTheDocument();

  });
});
