import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import {mockUser, mockTraining, mockComment} from '../../mocks/mocks';
import PopupFeedback from './popup-feedback';

const mockStore = configureMockStore();
const user = mockUser();
const comments = Array.from({length: 5}, () => mockComment());
const training = mockTraining();
const history = createMemoryHistory();

const store = mockStore({
  DATA_COMMENT: {comments: comments, isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false}
});
   
describe('Component: PopupFeedback', () => {
  it('should render "PopupFeedback"', async () => {
 
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PopupFeedback
            trainingId={training.id}
            userId={user.id}
            onClose={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(5);

    await userEvent.type(screen.getByTestId('textarea'), 'Минимальная длина 100 символ. Максимальная длина 1024 символов...................................................................');

    expect(screen.getByDisplayValue(/Минимальная длина 100 символ. Максимальная длина 1024 символов.................................................................../i)).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();


    const [rating1,rating2,,,] = screen.getAllByRole('radio');

    await userEvent.click(rating1);
    expect(rating1).toBeChecked();

    await userEvent.click(rating2);
    expect(rating2).toBeChecked();
  });
});
