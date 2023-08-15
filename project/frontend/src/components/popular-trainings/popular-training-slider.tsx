import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/index';
import { fetchCountTrainings, fetchCatalogTrainings } from '../../store/api-actions-trainings';
import { UserRole } from '../../types/user';

type Prop = {
    next?: () => void;
    previous?: () => void;
}

export default function PopularTrainingsButton({ next, previous }: Prop) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routeChangeTraining = () => {
    dispatch(fetchCountTrainings(UserRole.User));
    dispatch(fetchCatalogTrainings());
    const path = `${AppRoute.Training}/catalog`;
    navigate(path);
  };

  return (
    <div className="popular-trainings__title-wrapper">
      <h2 className="popular-trainings__title">Популярные тренировки</h2>
      <button
        className="btn-flat popular-trainings__button"
        type="button"
        onClick={routeChangeTraining}
      ><span>Смотреть все</span>
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
      <div className="popular-trainings__controls">
        <button
          className="btn-icon popular-trainings__control"
          type="button"
          aria-label="previous"
          onClick={() => previous?.()}
        >
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
        </button>
        <button
          className="btn-icon popular-trainings__control"
          type="button"
          aria-label="next"
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
