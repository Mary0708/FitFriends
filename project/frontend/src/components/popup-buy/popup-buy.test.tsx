import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fakerStore, fakerTraining } from '../../utils/mock-data';
import PopupBuy from './popup-buy';

describe('Component: PopupBuy', () => {
  it('Должен отобразить компонент', () => {
    render(
      <Provider store={fakerStore}>
        <BrowserRouter>
          <PopupBuy
            training={fakerTraining}
            onClose={() => null}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Купить тренировку/i)).toBeInTheDocument();
  });
});
