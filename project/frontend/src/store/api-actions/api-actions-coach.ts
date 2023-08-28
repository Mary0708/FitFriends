import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from './api-actions-user';
import { APIRoute, AppRoute } from '../../const';
import { saveToken } from '../../services/token';
import { QuestionnaireCoach } from '../../types/questionnaire';
import { AppDispatch, State } from '../../types/state';
import { CreateUser, FileType, UserData, User, Friend } from '../../types/user';
import { adaptCoachToServer, adaptAvatarToServer, adaptCertificateToServer } from '../../utils/adapters/adaptersToServer';
import { setAuthInfo, setUser } from '../user-process/user-process';
import { redirectToRoute } from './action';

export const Action = {
  REGISTER_COACH: 'coach/register',
  UPD_CERTIFICATE: 'coach/updateCertificate',
  POST_CERTIFICATE: 'coach/postCertificate',
  DELETE_CERTIFICATE: 'coach/deleteCertificate',
  DELETE_COACH_FRIEND: 'coach/deleteCoachFriend'
};

export const registerCoach = createAsyncThunk<void, CreateUser & QuestionnaireCoach & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.REGISTER_COACH,
  async (newCoach: CreateUser & QuestionnaireCoach & FileType, { dispatch, extra: api }) => {
    const { data } = await api.post<{ id: string }>(APIRoute.Register, adaptCoachToServer(newCoach));

    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email: newCoach.email, password: newCoach.password });
    saveToken(token);
    if (data && newCoach.avatarImg?.name && newCoach.fileCertificate?.name) {
      const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
      await api.post(postAvatarApiRoute, adaptAvatarToServer(newCoach.avatarImg));

      const postCertificateApiRoute = `${APIRoute.Files}/coach/certificate`;
      await api.post(postCertificateApiRoute, adaptCertificateToServer(newCoach.fileCertificate));
    }
    const user = await api.get<User>(APIRoute.CheckUser);
    dispatch(setAuthInfo({ authInfo: { id: data.id, name: user.data.name, role: user.data.role, email: user.data.email, token: token } }));
    dispatch(setUser({ user: user.data }));
    dispatch(redirectToRoute(AppRoute.AccountCoach));
  });

export const updateCertificate = createAsyncThunk<void, FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.UPD_CERTIFICATE,
  async ({ certificateId, fileCertificate }, { extra: api }) => {
    if (fileCertificate) {
      const postCertificateApiRoute = `${APIRoute.Files}/coach/certificate/update`;
      await api.post(postCertificateApiRoute, adaptCertificateToServer(fileCertificate, certificateId));
    }

  });

export const postCertificate = createAsyncThunk<void, FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.POST_CERTIFICATE,
  async (newCertificate: FileType, { dispatch, extra: api }) => {
    if (newCertificate.fileCertificate) {
      const postCertificateApiRoute = `${APIRoute.Files}/coach/certificate`;
      await api.post(postCertificateApiRoute, adaptCertificateToServer(newCertificate.fileCertificate));
      dispatch(fetchUser());
      dispatch(redirectToRoute(AppRoute.AccountCoach));
    }

  });

export const deleteCertificate = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.DELETE_CERTIFICATE,
  async (certificateId, { dispatch, extra: api }) => {
    await api.delete(`${APIRoute.Coach}/certificate/delete/${certificateId}`);
    dispatch(fetchUser());
    dispatch(redirectToRoute(AppRoute.AccountCoach));
  });


export const deleteCoachFriend = createAsyncThunk<Friend, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.DELETE_COACH_FRIEND,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.post<Friend>(`${APIRoute.Coach}/friends/delete/${id}`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  });


