import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import NotificationList from './notification-list';
import { mockNotify } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();
const notifications = Array.from({ length: 5 }, () => mockNotify())
const history = createMemoryHistory();

const store = mockStore({
  DATA_NOTIFY: {
    notifications: notifications, hasErrorDeleteNotify: false,
    isNotifyLoad: false, isNotifyLoadDelete: false
  }
});

describe('Component: NotificationList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <NotificationList notifications={notifications} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оповещения/i)).toBeInTheDocument();
  });
});
