import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/index';
import { fetchCountUsers, fetchUserCatalog } from '../../store/api-actions/api-actions-user';

type Prop = {
    next?: () => void;
    previous?: () => void;
}

export default function LookForCompanySlider({ next, previous }: Prop) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routeChangeUsers = () => {
    dispatch(fetchCountUsers());
    dispatch(fetchUserCatalog());
    const path = AppRoute.Users;
    navigate(path);
  };

  return (
    <div className="look-for-company__title-wrapper">
      <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
      <button
        className="btn-flat btn-flat--light look-for-company__button"
        type="button"
        onClick={routeChangeUsers}
      >
        <span>Смотреть все</span>
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
      <div className="look-for-company__controls">
        <button
          className="btn-icon btn-icon--outlined look-for-company__control"
          type="button" aria-label="previous"
          onClick={() => previous?.()}
        >
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
        </button>
        <button
          className="btn-icon btn-icon--outlined look-for-company__control"
          type="button" aria-label="next"
          onClick={() => next?.()}
        >
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
