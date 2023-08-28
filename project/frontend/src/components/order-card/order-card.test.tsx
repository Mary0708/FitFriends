import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import OrderCard from './order-card';
import { mockOrder } from '../../mocks/mocks';
import { UserRole } from '../../types/user';

const mockStore = configureMockStore();
const order = mockOrder();
const history = createMemoryHistory();

const store = mockStore({
  DATA_ORDERS: {
    orders: [order], order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0
  }
});

describe('Component: OrderCard', () => {
  it('should render "OrderCard"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <OrderCard
              order={order}
              currentUserRole={UserRole.User}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(order.title)).toBeInTheDocument();
    expect(screen.getByText(order.description)).toBeInTheDocument();

  });
});
