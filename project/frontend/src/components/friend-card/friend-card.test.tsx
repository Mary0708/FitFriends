import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { mockFriend } from '../../mocks/mocks';
import { UserRole } from '../../types/user';
import FriendCard from './friend-card';

const mockStore = configureMockStore();
const fakeFriend = mockFriend();
const history = createMemoryHistory();

const store = mockStore({
  DATA_FRIENDS: {
    friends: [fakeFriend], countFiends: 1, isCountDataLoading: false,
    isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
    isFriendLoadDelete: false, isFriendLoadPost: false
  }
});

describe('Component: FriendCard', () => {
  it('should render "FriendCard"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FriendCard
              user={fakeFriend}
              currentUserRole={UserRole.Coach}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeFriend.name)).toBeInTheDocument();
    expect(screen.getByText(fakeFriend.location)).toBeInTheDocument();

  });
});
