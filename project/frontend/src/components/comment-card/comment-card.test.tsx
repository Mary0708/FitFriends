import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { mockComment } from '../../mocks/mocks';
import CommentCard from './comment-card';

const mockStore = configureMockStore();
const fakeComment = mockComment();
const history = createMemoryHistory();

const store = mockStore({
  DATA_COMMENT: { comments: [fakeComment], isCommentsDataLoading: false, hasError: false, hasErrorPostComment: false }
});

describe('Component: CommentCard', () => {
  it('should render "CommentCard"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CommentCard
              comment={fakeComment}
            />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeComment.message)).toBeInTheDocument();

  });
});
