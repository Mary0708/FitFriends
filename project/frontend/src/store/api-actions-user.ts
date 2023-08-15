import { AxiosError, AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { APIRoute, AppRoute, DEFAULT_SORT_DIRECTION_USER, HttpCode } from '../const';
import { saveToken, dropToken } from '../services/token';
import { redirectToRoute } from './action';
import { QuestionnaireUser } from '../types/questionnaire';
import { adaptAvatarToServer, adaptUserEditToServer, adaptUserToServer } from '../utils/adapters/adaptersToServer';
import { adaptUserToClient } from '../utils/adapters/adaptersToClient';
import { setAuthInfo, setUser } from './user-process/user-process';
import { Query } from '../types/training';
import { User, UserRole, CreateUser, FileType, UserEdit, UserData } from '../types/user.js';

export const Action = {
  CHEK_USER: 'user/checkAuthAction',
  CHEK_EMAIL: 'user/checkEmail',
  LOGIN_USER: 'user/login',
  REGISTER_USER: 'user/register',
  EDIT_USER: 'user/edit',
  FETCH_USER_OTHER: 'user/fetchUserOther',
  FETCH_USER: 'user/fetchUser',
  FETCH_USER_CATALOG: 'user/fetchUserCatalog',
  FETCH_COUNT_USERS: 'user/fetchCountUsers',
  CREATE_SUBSCRIBE: 'user/createSubscribe',
  DELETE_SUBSCRIBE: 'user/deleteSubscribe',
};

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.CHEK_USER,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.CheckUser);
      dispatch(setAuthInfo({ authInfo: data }));

      return data;

    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
        dropToken();
      }

      return Promise.reject(error);
    }
  },
);

export const loginUser = createAsyncThunk<User | null, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.LOGIN_USER,
  async ({ login: email, password }, { dispatch, extra: api }) => {

    const auth = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(auth.data.token);

    const { data } = await api.get<User>(APIRoute.CheckUser);

    dispatch(setAuthInfo({ authInfo: { id: data.id, name: data.name, role: data.role, email: data.email, token: auth.data.token } }));
    dispatch(setUser({ user: data }));

    if (data.role === UserRole.Coach) {
      dispatch(redirectToRoute(AppRoute.AccountCoach));
    }
    else {
      dispatch(redirectToRoute(AppRoute.Main));
    }
    return adaptUserToClient(data);
  },
);

export const checkEmail = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.CHEK_EMAIL,
  async ({ login: email }, { dispatch, extra: api }) => {
    const { data } = await api.post<string>(APIRoute.CheckEmail, { email });
    if (data) {
      return data;
    }
    return 'false';
  },
);

export const registerUser = createAsyncThunk<void, CreateUser & QuestionnaireUser & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.REGISTER_USER,
  async (newUser: CreateUser & QuestionnaireUser & FileType, { dispatch, extra: api }) => {
    const { data } = await api.post<{ id: string }>(APIRoute.Register, adaptUserToServer(newUser));

    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email: newUser.email, password: newUser.password });
    saveToken(token);
    if (data && newUser.avatarImg?.name) {
      const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
      await api.post(postAvatarApiRoute, adaptAvatarToServer(newUser.avatarImg));
    }
    const user = await api.get<User>(APIRoute.CheckUser);
    dispatch(setAuthInfo({ authInfo: { id: data.id, name: user.data.name, role: user.data.role, email: user.data.email, token: token } }));
    dispatch(setUser({ user: user.data }));
    dispatch(redirectToRoute(AppRoute.Main));
  });

export const editUser = createAsyncThunk<User, UserEdit & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.EDIT_USER,
  async (updUser: UserEdit & FileType, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(`${APIRoute.Users}/edit`, adaptUserEditToServer(updUser));
    if (data && updUser.avatarImg?.name) {
      const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
      await api.post(postAvatarApiRoute, adaptAvatarToServer(updUser.avatarImg));
    }
    dispatch(fetchUser());
    return adaptUserToClient(data);
  });

export const fetchUserOther = createAsyncThunk<User, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.FETCH_USER_OTHER,
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<User>(`${APIRoute.Users}/${id}`);
    return adaptUserToClient(data);
  });


export const fetchUser = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.FETCH_USER,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User>(APIRoute.CheckUser);
      return adaptUserToClient(data);

    } catch (error) {

      return Promise.reject(error);
    }
  });

export const fetchCountUsers = createAsyncThunk<number, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.FETCH_COUNT_USERS,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<number>(`${APIRoute.Users}/get/count`);
      return data;

    } catch (error) {

      return Promise.reject(error);
    }
  });

export const fetchUserCatalog = createAsyncThunk<User[], Query | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.FETCH_USER_CATALOG,
  async (query, { extra: api }) => {
    try {
      const limit = query && query.limit ? `limit=${query.limit}&` : `limit=${DEFAULT_SORT_DIRECTION_USER}&`;
      const page = query && query.page ? `page=${query.page}&` : 'page=1&';
      const userRoleQuery = query && query.userRole ? `userRole=${query.userRole}&` : '';
      const locationQuery = query && query.location ? `location=${query.location.join(',')}&` : '';
      const levelTrainingQuery = query && query.levelTraining ? `levelTraining=${query.levelTraining}&` : '';
      const trainingTypeQuery = query && query.trainingType ? `trainingType=${query.trainingType.join(',').trim()}` : '';
      const { data } = await api.get<User[]>(`${APIRoute.Users}?${limit}${page}${userRoleQuery}${levelTrainingQuery}${locationQuery}${trainingTypeQuery}`);
      return data;

    } catch (error) {

      return Promise.reject(error);
    }
  });

export const createSubscribe = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.CREATE_SUBSCRIBE,
  async (coachId, { extra: api }) => {
    try {
      await api.post(`${APIRoute.User}/subscription/create`, { 'coachId': coachId });
    } catch (error) {
      return Promise.reject(error);
    }
  });

export const deleteSubscribe = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.DELETE_SUBSCRIBE,
  async (coachId, { extra: api }) => {
    try {
      await api.delete(`${APIRoute.User}/subscription/delete`, { data: { 'coachId': coachId } });
    } catch (error) {
      return Promise.reject(error);
    }
  });

