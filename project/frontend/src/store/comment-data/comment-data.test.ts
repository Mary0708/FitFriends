import {commentsData} from './comment-data';
import {CommentData} from '../../types/state';
import {mockComment} from '../../mocks/mocks';
import { fetchComments, postComment } from '../api-actions/api-actions-trainings';

describe('Reducer: comments', () => {
  let state: CommentData;

  beforeEach(() => {
    state = {
      comments: [],
      isCommentsDataLoading: false,
      hasError: false,
      hasErrorPostComment: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(commentsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({ comments: [],
        isCommentsDataLoading: false,
        hasError: false,
        hasErrorPostComment: false});
  });

  describe('fetchComments test', () => {
    it('fetchComments fulfilled test', () => {
      const comments = Array.from({length: 5}, () => mockComment());
      expect(commentsData.reducer(state, { type: fetchComments.fulfilled, payload: comments}))
        .toEqual({comments: comments,
          isCommentsDataLoading: false,
          hasError: false,
          hasErrorPostComment: false});
    });
    it('fetchComments rejected test', () => {
      expect(commentsData.reducer(state, { type: fetchComments.rejected.type }))
        .toEqual({comments: [],
          isCommentsDataLoading: false,
          hasError: true,
          hasErrorPostComment: false});
    });
  });


  describe('postComment test', () => {
    it('postComment fulfilled test', () => {
      const comments = Array.from({length: 5}, () => mockComment());
      const fakeComment = mockComment();
      expect(commentsData.reducer({...state, comments: comments} , { type: postComment.fulfilled, payload: fakeComment}))
        .toEqual({comments: [...comments, fakeComment],
          isCommentsDataLoading: false,
          hasError: false,
          hasErrorPostComment: false});
    });
    it('postComment rejected test', () => {
      expect(commentsData.reducer(state, { type: postComment.rejected.type }))
        .toEqual({comments: [],
          isCommentsDataLoading: false,
          hasError: false,
          hasErrorPostComment: true});
    });
  });
});
