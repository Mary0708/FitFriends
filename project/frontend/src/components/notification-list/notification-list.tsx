import { useAppDispatch } from '../../hooks';
import { deleteNotifyAction } from '../../store/notify/notify-api-actions';
import { Notify } from '../../types/notify';

const MAX_COUNT_NOTIFY = 5;

export default function NotificationList({ notifications }: { notifications: Notify[] }): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="main-nav__dropdown">
      <p className="main-nav__label">Оповещения</p>
      <ul className="main-nav__sublist">
        {
          notifications
            .slice(0, MAX_COUNT_NOTIFY)
            .map((notify, index) => (
              <li key={notify.id} className="main-nav__subitem">
                <div
                  className="notification is-active"
                  onClick={() => {
                    dispatch(deleteNotifyAction({ id: notifications[index].id, index }));
                  }}
                >
                  <p className="notification__text">{notify.message}</p>
                  <time className="notification__time" dateTime={notify.createdAt.toString()}>{new Date(notify.createdAt).toDateString()}</time>
                </div>
              </li>
            ))
        }
      </ul>
    </div>
  );
}
