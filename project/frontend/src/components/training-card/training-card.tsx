import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { Training } from '../../types/training';
import { fetchUserOrder } from '../../store/api-actions/api-actions-order';
import { fetchCoachTraining, fetchComments } from '../../store/api-actions/api-actions-trainings';

type Props = {
  training: Training;
}

export default function TrainingCard({ training }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const routeChange = () => {
    dispatch(fetchCoachTraining(training.id));
    dispatch(fetchUserOrder(training.id));
    dispatch(fetchComments(training.id));
    const path = `${AppRoute.Training}/${training.id}`;
    navigate(path);
  };

  return (
    <div className="thumbnail-training__inner">
      <div className="thumbnail-training__image">
        {training.photo &&
          (
            <picture>
              <source type="image/webp" />
              <img src={training.photo} width="330" height="190" alt="" />
            </picture>
          )}
        {!training.photo &&
          (
            <picture>
              <source type="image/webp" srcSet="img/content/thumbnails/training-06.webp, img/content/thumbnails/training-06@2x.webp 2x" />
              <img src="img/content/thumbnails/training-06.jpg" srcSet="img/content/thumbnails/training-06@2x.jpg 2x" width="330" height="190" alt="" />
            </picture>
          )}
      </div>
      <p className="thumbnail-training__price">{training.price === 0 ? 'Бесплатно' : training.price}
      </p>
      <h3 className="thumbnail-training__title">{training.title}</h3>
      <div className="thumbnail-training__info">
        <ul className="thumbnail-training__hashtags-list">
          <li className="thumbnail-training__hashtags-item">
            <div className="hashtag thumbnail-training__hashtag"><span>#{training.trainingType}</span></div>
          </li>
          <li className="thumbnail-training__hashtags-item">
            <div className="hashtag thumbnail-training__hashtag"><span>#{training.caloriesReset}ккал</span></div>
          </li>
        </ul>
        <div className="thumbnail-training__rate">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg><span className="thumbnail-training__rate-value">{training.rating}</span>
        </div>
      </div>
      <div className="thumbnail-training__text-wrapper">
        <p className="thumbnail-training__text">{training.description}</p>
      </div>
      <div className="thumbnail-training__button-wrapper">
        <button
          className="btn btn--small thumbnail-training__button-catalog"
          type="button"
          onClick={routeChange}
        >Подробнее
        </button>
        <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="/">Отзывы</a>
      </div>
    </div>
  );
}
