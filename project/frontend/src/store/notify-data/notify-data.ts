import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { NotifyData } from '../../types/state';
import { fetchNotify, deleteNotify } from '../api-actions/api-actions-request';

const initialState: NotifyData = {
  notifications: [],
  hasErrorDeleteNotify: false,
  isNotifyLoad: false,
  isNotifyLoadDelete: false
};

export const notifyData = createSlice({
  name: NameSpace.Notify,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNotify.pending, (state) => {
        state.isNotifyLoad = true;
      })
      .addCase(fetchNotify.fulfilled, (state, action) => {
        state.isNotifyLoad = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotify.rejected, (state) => {
        state.isNotifyLoad = false;
      })
      .addCase(deleteNotify.pending, (state) => {
        state.hasErrorDeleteNotify = false;
        state.isNotifyLoadDelete = true;
      })
      .addCase(deleteNotify.fulfilled, (state) => {
        state.hasErrorDeleteNotify = false;
        state.isNotifyLoadDelete = false;
      })
      .addCase(deleteNotify.rejected, (state) => {
        state.hasErrorDeleteNotify = true;
        state.isNotifyLoadDelete = false;
      });
  }
});

