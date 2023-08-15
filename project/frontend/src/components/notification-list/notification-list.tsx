import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteNotify, fetchNotify } from '../../store/api-actions-request';
import { Notify } from '../../types/notify';
import { getSignNotifyLoadDelete, getErrorDeleteNotify } from '../../store/notify-data/selectors';

const MAX_COUNT_NOTIFY = 5;

export default function NotificationList({ notifications }: { notifications: Notify[] }): JSX.Element {
  const dispatch = useAppDispatch();
  const [countDelete, setCountDelete] = useState(0);
  const isNotifyLoadDelete = useAppSelector(getSignNotifyLoadDelete);
  const hasErrorDeleteNotify = useAppSelector(getErrorDeleteNotify);

  const handleNotify = (evt: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    setCountDelete(countDelete + 1);
    dispatch(deleteNotify(id));
  };

  useEffect(() => {
    if (!hasErrorDeleteNotify && !isNotifyLoadDelete) {
      dispatch(fetchNotify());
    }
  }, [countDelete, dispatch, hasErrorDeleteNotify, isNotifyLoadDelete]);


  return (
    <div className="main-nav__dropdown">
      <p className="main-nav__label">Оповещения</p>
      <ul className="main-nav__sublist">
        {
          notifications
            .slice(0, MAX_COUNT_NOTIFY)
            .map((notify,) => (
              <li key={notify.id} className="main-nav__subitem">
                <div
                  className="notification is-active"
                  onClick={(e) => { handleNotify(e, notify.id); }}
                >
                  <p className="notification__text">{notify.text}</p>
                  <time className="notification__time" dateTime={notify.dateNotify.toString()}>{new Date(notify.dateNotify).toDateString()}</time>
                </div>
              </li>
            ))
        }
      </ul>
    </div >
  );
}
