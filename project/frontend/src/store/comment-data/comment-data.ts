import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CommentData} from '../../types/state';
import { fetchComments, postComment } from '../api-actions/api-actions-trainings';

const initialState: CommentData = {
  comments: [],
  isCommentsDataLoading: false,
  hasError: false,
  hasErrorPostComment: false
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isCommentsDataLoading = false;
        state.hasError = true;
      })
      .addCase(postComment.pending, (state) => {
        state.hasErrorPostComment = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.hasErrorPostComment = true;
      });
  }
});

