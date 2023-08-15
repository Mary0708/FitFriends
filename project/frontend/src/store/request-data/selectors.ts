import {NameSpace} from '../../const';
import {State} from '../../types/state';


export const getErrorPost = (state: State): boolean => state[NameSpace.Request].hasErrorPost;
export const getErrorDelete = (state: State): boolean => state[NameSpace.Request].hasErrorDelete;
export const getSignLoadDelete = (state: State): boolean => state[NameSpace.Request].isLoadDelete;
export const getSignLoadPost = (state: State): boolean => state[NameSpace.Request].isLoadPost;

