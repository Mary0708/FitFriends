import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Friend} from '../../types/user';


export const getFriends = (state: State): Friend[] => state[NameSpace.Friends].friends;
export const getCountFiends = (state: State): number => state[NameSpace.Friends].countFiends;
export const getFriendsDataLoadingStatus = (state: State): boolean => state[NameSpace.Friends].isFriendsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Friends].hasError;
export const getErrorPost = (state: State): boolean => state[NameSpace.Friends].hasErrorPost;
export const getSignFriendLoadDelete = (state: State): boolean => state[NameSpace.Friends].isFriendLoadDelete;
export const getSignFriendLoadPost = (state: State): boolean => state[NameSpace.Friends].isFriendLoadPost;
