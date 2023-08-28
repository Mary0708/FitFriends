import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AuthorizationStatus, AppRoute} from '../../const';
import App from './app';
import {mockUser, mockTraining, mockComment, mockOrder, mockUserCoach} from '../../mocks/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const user = mockUser();
const userOther = mockUserCoach();
const userCatalog = Array.from({length: 5}, () => mockUser());
const comments = Array.from({length: 5}, () => mockComment());
const trainings = Array.from({length: 5}, () => mockTraining());
const orders = Array.from({length: 5}, () => mockOrder());

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: user, hasErrorLogin: false,
    userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
    isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
    hasErrorPostCertificate: false, users: userCatalog, userOther: userOther, isUserOtherLoading: false, countUsers: 0},
  DATA_FRIENDS: {friends: [], countFiends: 0, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false},
  DATA_TRAININGS: {trainings: trainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: trainings[0],
    hasErrorPost: false, isLoadingPostTraining: false},
  DATA_COMMENT: {comments: comments, isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false},
  DATA_NOTIFY: {notifications: [], hasErrorDeleteNotify: false, isNotifyLoad: false, isNotifyLoadDelete: false},
  DATA_ORDERS: {orders: orders, order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0},
  DATA_SUBSCRIBE: {hasErrorPost: false, hasErrorDelete: false, isSubscrLoadPost: false, isSubscrLoadDelete: false},
  DATA_REQUEST: {hasErrorPost: false, hasErrorDelete: false, isLoadPost: false, isLoadDelete: false}
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

jest.mock('../../hooks/use-scroll-to-up/use-scroll-to-up', () => function useScrollToUp() {
  return (
    <div>fake useScrollToUp</div>
  );
});

describe('Application Routing', () => {
  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Intro);

    render(fakeApp);

    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
  });

  it(`should render "Training" when user navigate to ${AppRoute.Training}/${trainings[0].id}`, () => {
    history.push(`${AppRoute.Training}/${trainings[0].id}`);

    render(fakeApp);
    const name = trainings[0].title ? trainings[0].title : ' ';
    expect(screen.getByText(/Видео/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(name)).toHaveAttribute('name', 'title');
  });

  it(`should render "Card user" when user navigate to ${AppRoute.Users}/${userOther.id}`, () => {
    history.push(`${AppRoute.Users}/${userOther.id}`);

    render(fakeApp);

    expect(screen.getByText(userOther.name)).toBeInTheDocument();
    expect(screen.getByText(userOther.location)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
