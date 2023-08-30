import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PopupBuy from './popup-buy';
import { mockOrder, mockTraining } from '../../mocks/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();
const order = mockOrder();
const training = mockTraining();

const store = mockStore({
  DATA_ORDERS: {orders: [order], order: null, isOrdersDataLoading: false,
    isOrderDataLoading: false, isOrdersUserDataLoading: false,
    hasError: false, hasErrorPost: false, isPostLoading: false,
    hasErrorReduce: false, countOrders: 0},
  DATA_TRAININGS: {trainings: [training],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
    isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
    isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
    hasError: false, isTrainingLoading: false, training: null,
    hasErrorPost: false, isLoadingPostTraining: false},
});

describe('Component: PopupBuy', () => {
  it('Должен отобразить компонент', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PopupBuy
            training={training}
            onClose={() => null}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Купить тренировку/i)).toBeInTheDocument();
  });
});
