import {NameSpace} from '../../const';
import {State} from '../../types/state';


export const getErrorPost = (state: State): boolean => state[NameSpace.Subscribe].hasErrorPost;
export const getErrorDelete = (state: State): boolean => state[NameSpace.Subscribe].hasErrorDelete;
export const getSignSubscrLoadDelete = (state: State): boolean => state[NameSpace.Subscribe].isSubscrLoadDelete;
export const getSignSubscrLoadPost = (state: State): boolean => state[NameSpace.Subscribe].isSubscrLoadPost;
