import {userProcess} from './user-process';
import {UserProcess} from '../../types/state';
import { Location } from '../../types/location';
import { Gender, UserRole } from '../../types/user';
import { AppRoute, AuthorizationStatus } from '../../const';
import { LevelTraining, TrainingTime } from '../../types/training';
import { mockUserData, mockUser } from '../../mocks/mocks';
import { checkAuthAction, loginUser, fetchUser, fetchUserCatalog } from '../api-actions/api-actions-user';

const UserNull = { id: '', name: '', email: '', gender: Gender.None, dateBirth: '', role: UserRole.Coach,
  description: '', location: Location.Pionerskaya, levelTraining: LevelTraining.Beginner,
  trainingType: [], successCoach: '', isPersonal: false, trainingTime: TrainingTime.Time30,
  caloriesReset: 0, caloriesSpend: 0, isReady: false, certificate: [], certificatesPath: []};

describe('Reducer: user', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: null,
      hasErrorLogin: false,
      createUser: null,
      user: UserNull,
      isUserLoading: false,
      isUserCatalogLoading: false,
      isAuthInfoLoading: false,
      existsEmail: false,
      hasErrorPostCertificate: false,
      users: [],
      userOther: null,
      isUserOtherLoading: false,
      countUsers: 0
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        authInfo: null,
        hasErrorLogin: false,
        userData: null,
        UserInfo: UserNull,
        isUserLoading: false,
        isUserCatalogLoading: false,
        isAuthInfoLoading: false,
        formRegistrType: AppRoute.Login,
        existsEmail: false,
        hasErrorPostCertificate: false,
        users: [],
        userOther: null,
        isUserOtherLoading: false,
        countUsers: 0
      });
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      const user = mockUserData();
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: user}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, authInfo: user, hasErrorLogin: false,
          userData: null, UserInfo: UserNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, authInfo: null, hasErrorLogin: false,
          userData: null, UserInfo: UserNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginUser.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, authInfo: null, hasErrorLogin: false,
          userData: null, UserInfo: UserNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginUser.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, authInfo: null, hasErrorLogin: true,
          userData: null, UserInfo: UserNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });


  describe('fetchUser test', () => {
    it('should get UserInfo if fetchUser fulfilled', () => {
      const user = mockUser();
      expect(userProcess.reducer(state, { type: fetchUser.fulfilled.type, payload: user }))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, UserInfo: user, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('should UserInfo is null if fetchUser rejected', () => {
      expect(userProcess.reducer(state, { type: fetchUser.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, UserInfo: UserNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });


  describe('fetchUserCatalog test', () => {
    it('fetchUserCatalog fulfilled test', () => {
      const users = Array.from({length: 5}, () => mockUser());
      expect(userProcess.reducer(state, { type: fetchUserCatalog.fulfilled, payload: users}))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, UserInfo: UserNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
          hasErrorPostCertificate: false, users: users, userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('fetchOffersAction rejected test', () => {
      expect(userProcess.reducer(state, { type: fetchUserCatalog.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, UserInfo: UserNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: AppRoute.Login, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });

});
