import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import IntroPage from '../../pages/intro-page/intro-page';
import LoginPage from '../../pages/login-page/login-page';
import RegistrationPage from '../../pages/registration-page/registration-page';
import AccountCoachPage from '../../pages/personal-account-coach/personal-account-coach';
import PrivateRoute from '../private-route/private-route';
import MyTrainingsPage from '../../pages/my-trainings/my-trainings';
import CreateTrainingPage from '../../pages/create-training/create-training';
import FriendsListPage from '../friends-list-coach/friends-list-coach';
import { getAuthCheckedStatus, getAuthInfo, getAuthInfoDataLoadingStatus, getAuthorizationStatus, getSignUserLoading } from '../../store/user-process/selectors';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import MyOrdersPage from '../../pages/my-orders/my-orders';
import MainPage from '../../pages/main-page/main-page';
import { UserRole } from '../../types/user';
import CatalogTrainingsPage from '../../pages/catalog-trainings/catalog-trainings';
import CatalogUsersPage from '../../pages/catalog-users/catalog-users';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import NotAuthRoute from '../not-auth-route/not-auth-route';
import MyPurchases from '../my-purchases/my-purchases';
import AccountUserPage from '../../pages/personal-account-user/personal-account-user';
import UserCardPage from '../../pages/user-card/user-card';
import FriendsListUserPage from '../friends-list-user/friends-list-user';
import TrainingCardUser from '../../pages/training-card-user/training-card-user';
import TrainingCardCoach from '../../pages/training-card-coach/training-card-coach';
import { fetchUser } from '../../store/api-actions/api-actions-user';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const createUser = useAppSelector(getAuthInfo);
  const isAuthInfoLoading = useAppSelector(getAuthInfoDataLoadingStatus);
  const isUserLoading = useAppSelector(getSignUserLoading);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchUser());
    }
  }, [authorizationStatus, dispatch]);

  if (!isAuthChecked || isAuthInfoLoading || isUserLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.User === createUser?.role}

          >
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Users}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.User === createUser?.role}
          >
            <CatalogUsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Intro}
        element={<IntroPage />}
      />
      <Route
        path={AppRoute.Login}
        element={
          <NotAuthRoute
            restrictedFor={authorizationStatus}
            userRole={createUser?.role}
          >
            <LoginPage />
          </NotAuthRoute>
        }
      />
      <Route
        path={AppRoute.Registration}
        element={<RegistrationPage />}
      />
      <Route
        path={AppRoute.AccountCoach}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.Coach === createUser?.role}>
            <AccountCoachPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.AccountUser}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.User === createUser?.role}>
            <AccountUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/trainings`}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.Coach === createUser?.role}
          >
            <MyTrainingsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/orders`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.Coach === createUser?.role}>
            <MyOrdersPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountUser}/orders`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.User === createUser?.role}>
            <MyPurchases />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/trainings/create`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.Coach === createUser?.role}>
            <CreateTrainingPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountCoach}/friends`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.Coach === createUser?.role}>
            <FriendsListPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.AccountUser}/friends`}
        element={
          <PrivateRoute restrictedFor={authorizationStatus} redirectTo={AppRoute.Login} verifyRole={UserRole.User === createUser?.role}>
            <FriendsListUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Training}/catalog`}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.User === createUser?.role}
          >
            <CatalogTrainingsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Training}/:id`}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.User === createUser?.role}
          >
            <TrainingCardUser />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Training}/:id`}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole={UserRole.Coach === createUser?.role}
          >
            <TrainingCardCoach />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Users}/:id`}
        element={
          <PrivateRoute
            restrictedFor={authorizationStatus}
            redirectTo={AppRoute.Login}
            verifyRole
          >
            <UserCardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}
