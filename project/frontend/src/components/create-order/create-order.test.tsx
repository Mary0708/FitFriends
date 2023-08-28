import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CreateOrder from './create-order';
import { mockOrder, mockTraining } from '../../mocks/mocks';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const order = mockOrder();
const training = mockTraining();
const history = createMemoryHistory();

const store = mockStore({
  DATA_ORDERS: {
    orders: [order], order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0
  },
  DATA_TRAININGS: {
    trainings: [training], countAllTrainings: { totalTrainings: 0, maxPrice: 0 },
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false
  },
});

describe('Component: CreateOrder', () => {
  it('should render "CreateOrder"', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CreateOrder
              training={training}
              onClose={jest.fn()}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(training.title ? training.title : '')).toBeInTheDocument();

    const [paymentOption1, paymentOption2, paymentOption3, , ,] = screen.getAllByRole('radio');

    await userEvent.click(paymentOption1);
    expect(paymentOption1).toBeChecked();

    await userEvent.click(paymentOption2);
    expect(paymentOption2).toBeChecked();

    await userEvent.click(paymentOption3);
    expect(paymentOption3).toBeChecked();

  });
});
