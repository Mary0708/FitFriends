import {NameSpace} from '../../const';
import { Comment } from '../../types/comment';
import {State} from '../../types/state';

export const getErrorPost = (state: State): boolean => state[NameSpace.Comments].hasErrorPostComment;
export const getComments = (state: State): Comment[] => state[NameSpace.Comments].comments;
export const getSignCommentsLoading = (state: State): boolean => state[NameSpace.Comments].isCommentsDataLoading;
