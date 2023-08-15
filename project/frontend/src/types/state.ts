import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { Order } from './order';
import { Notify } from './notify';
import { Training, TotalTrainInfo } from './training';
import { User, CreateUser, Friend, UserData } from './user';
import { Comment } from './comment';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authInfo: UserData | null;
  hasErrorLogin: boolean;
  createUser: CreateUser | null;
  user: User;
  existsEmail: boolean;
  isUserLoading: boolean;
  isUserCatalogLoading: boolean;
  isAuthInfoLoading: boolean;
  hasErrorPostCertificate: boolean;
  users: User[];
  userOther: User | null;
  isUserOtherLoading: boolean;
  countUsers: number;
};

export type TrainingData = {
  trainings: Training[];
  countAllTrainings: TotalTrainInfo;
  isLoadingCountAllTrainings: boolean;
  userTrainings: Training[];
  isTrainingsDataLoading: boolean;
  hasError: boolean;
  isTrainingLoading: boolean;
  training: Training;
  hasErrorPost: boolean;
  coachTrainings: Training[];
  isCoachTrainingsLoading: boolean;
  isLoadingPostTraining: boolean;
};

export type CommentData = {
  comments: Comment[];
  isCommentsDataLoading: boolean;
  hasError: boolean;
  hasErrorPostComment: boolean;
};

export type FriendData = {
  friends: Friend[];
  countFiends: number;
  isCountDataLoading: boolean;
  isFriendsDataLoading: boolean;
  hasError: boolean;
  hasErrorPost: boolean;
  isFriendLoadDelete: boolean;
  isFriendLoadPost: boolean;
};

export type OrderData = {
  orders: Order[];
  isOrdersDataLoading: boolean;
  isOrdersCreateUserLoading: boolean;
  hasError: boolean;
  hasErrorPost: boolean;
  isPostLoading: boolean;
  hasErrorReduce: boolean;
  order: Order | null;
  isOrderDataLoading: boolean;
  countOrders: number;
};

export type RequestData = {
  hasErrorPost: boolean;
  hasErrorDelete: boolean;
  isLoadPost: boolean;
  isLoadDelete: boolean;
};

export type SubscribeData = {
  hasErrorPost: boolean;
  hasErrorDelete: boolean;
  isSubscrLoadPost: boolean;
  isSubscrLoadDelete: boolean;
};

export type NotifyData = {
  notifications: Notify[];
  hasErrorDeleteNotify: boolean;
  isNotifyLoad: boolean;
  isNotifyLoadDelete: boolean;
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
