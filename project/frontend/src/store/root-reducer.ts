import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import { trainingsData } from './trainings-data/trainings-data';
import { friendsData } from './friends-data/friends-data';
import { ordersData } from './orders-data/orders-data';
import { requestData } from './request-data/request-data';
import { commentsData } from './comment-data/comment-data';
import { subscribeData } from './subscribe-data/subscribe-data';
import { notifyData } from './notify-data/notify-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Trainings]: trainingsData.reducer,
  [NameSpace.Friends]: friendsData.reducer,
  [NameSpace.Orders]: ordersData.reducer,
  [NameSpace.Request]: requestData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
  [NameSpace.Subscribe]: subscribeData.reducer,
  [NameSpace.Notify]: notifyData.reducer
});
