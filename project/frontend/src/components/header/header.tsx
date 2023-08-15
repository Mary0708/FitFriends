import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getUser } from '../../store/user-process/selectors';
import { AppRoute } from '../../const';
import { UserRole } from '../../types/user';
import { getNotifications } from '../../store/notify-data/selectors';
import { getTraining } from '../../store/trainings-data/selectors';
import NotificationList from '../notification-list/notification-list.js';

export default function Header(): JSX.Element {
  const training = useAppSelector(getTraining);
  const { pathname } = useLocation();
  const userInfo = useAppSelector(getUser);
  const pathType = userInfo.role === UserRole.Coach ? AppRoute.AccountCoach : AppRoute.AccountUser;
  const pathTypeMain = userInfo.role === UserRole.Coach ? AppRoute.AccountCoach : AppRoute.Main;

  const notifications = useAppSelector(getNotifications);
  const notificationClass = `main-nav__item main-nav__item--notifications
  ${notifications.length ? ' is-notifications' : ''}`;
  const friendsLinkClass = pathname === AppRoute.FriendsListUser || pathname === AppRoute.FriendsListCoach ?
    'main-nav__link is-active' : 'main-nav__link';

  return (
    <header className="header">
      <div className="container">
        <Link className="header__logo" aria-label="Переход на главную" to={pathTypeMain}>
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link is-active" to={pathTypeMain} aria-label="На главную">
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={pathType} aria-label="Личный кабинет">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className={friendsLinkClass} to={AppRoute.FriendsListUser} aria-label="Друзья">
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg>
              </Link>
            </li>
            <li className={notificationClass}>
              <Link className="main-nav__link" to="#" aria-label="Уведомления">
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg>
              </Link>
              <NotificationList notifications={notifications} />
            </li>
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label><span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg className="search__icon" width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item"><a className="search__link" href="/">{training.trainingType}</a></li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}
