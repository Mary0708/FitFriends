import {NameSpace} from '../../const';
import { Notify } from '../../types/notify';
import {State} from '../../types/state';


export const getNotifications = (state: State): Notify[] => state[NameSpace.Notify].notifications;
export const getErrorDeleteNotify = (state: State): boolean => state[NameSpace.Notify].hasErrorDeleteNotify;
export const getSignNotifyLoad = (state: State): boolean => state[NameSpace.Notify].isNotifyLoad;
export const getSignNotifyLoadDelete = (state: State): boolean => state[NameSpace.Notify].isNotifyLoadDelete;
