import { Metro, Location } from './types/location';

export enum AppRoute {
  Login = '/login',
  Intro = '/',
  Main = '/main',
  Registration = '/registration',
  NotFound = '/404',
  Add = '/add',
  Edit = '/edit',
  FriendsListCoach = 'coach/friends-list',
  FriendsListUser = 'user/friends-list',
  QuestionnaireCoach = '/questionnaire-coach',
  QuestionnaireUser = '/questionnaire-user',
  AccountCoach = '/coach/account',
  AccountUser = '/user/account',
  Training = '/training',
  Users = '/users'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Login = '/users/login',
  Logout = '/users/logout',
  Register = '/users/register',
  Files = '/files',
  CheckEmail = '/users/check/email',
  CheckUser = '/users/login/auth',
  Users = '/users',
  User = '/user',
  Coach = 'coach',
  CoachTraining = 'coach/training',
  Training = 'training',
}

export enum NameSpace {
  Trainings = 'DATA_TRAININGS',
  Sort = 'SORT',
  User = 'USER',
  Friends = 'DATA_FRIENDS',
  Orders = 'DATA_ORDERS',
  Request = 'DATA_REQUEST',
  Comments = 'DATA_COMMENT',
  Subscribe = 'DATA_SUBSCRIBE',
  Notify = 'DATA_NOTIFY'
}

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export const enum SuccessCoach {
  MinLength = 10,
  MaxLength = 140
}

export const enum DescriptionLn {
  MinLength = 10,
  MaxLength = 140
}

export const enum CommentLn {
  MinLength = 100,
  MaxLength = 1024
}

export const DEFAULT_PRICE_NUMBER = 0;
export const MAX_PRICE_NUMBER = 10000;

export const MIN_CALORIES_VALUE = 1000;
export const MAX_CALORIES_VALUE = 5000;
export const COUNT_TRAINING_FOR_YOU = 9;
export const COUNT_TRAINING_SPECIAL = 3;
export const COUNT_USERS_READY = 8;
export const SHOW_TRAINING_TYPE = 5;

export const RATINGS = [1, 2, 3, 4, 5];
export const COUNT_ORDER_DEFAULT = 5;
export const DEFAULT_RATING = 5;
export const ORDERS_LIMIT = 4;
export const ZOOM = 12;
export const COUNT_TRAINING_FOR_SEND = 4;

export const DEFAULT_QUERY_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION_USER = -1;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_TRAININGS_CATALOG_NUMBER = 12;
export const DEFAULT_USERS_CATALOG_NUMBER = 24;
export const MIN_RATING_NUMBER = 0;
export const MAX_RATING_NUMBER = 5;
export const DEFAULT_CALORIES_STEP = 100;
export const DEFAULT_RATING_STEP = 1;
export const MIN_TITLE_LENGTH = 1;
export const MAX_TITLE_LENGTH = 15;


export const POINT_ARR: Metro[] = [
  {
    name: Location.Petrogradskaya,
    location: [59.966399, 30.311511]
  },
  {
    name: Location.Pionerskaya,
    location: [59.950190, 30.288335]
  },
  {
    name: Location.Sportivnaya,
    location: [60.002517, 30.296671]
  },
  {
    name: Location.Udelnaya,
    location: [60.016681, 30.315617]
  },
  {
    name: Location.Zvyozdnaya,
    location: [59.833233, 30.349492]
  },
];


