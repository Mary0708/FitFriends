import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getErrorPost } from '../../store/trainings-data/selectors';
import { CommentLn, DEFAULT_RATING, RATINGS } from '../../const';
import { toast } from 'react-toastify';
import { postComment } from '../../store/api-actions-trainings';

type Prop = {
  onClose?: () => void;
  trainingId: string;
  userId: string;
}

export default function PopupFeedback({ trainingId, userId, onClose }: Prop): JSX.Element {
  const dispatch = useAppDispatch();
  const isErrorPost = useAppSelector(getErrorPost);
  const [currentRating, setRating] = useState(DEFAULT_RATING);
  const [messageText, setMessageText] = useState<string>('');
  const [isDone, setSignDone] = useState(false);
  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setRating(Number(value));
    evt.target.setAttribute('checked', 'true');
  };

  const handleMessageChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setMessageText(value);
  };

  useEffect(() => {
    if (
      messageText && (messageText.length < CommentLn.MinLength
        || messageText.length > CommentLn.MaxLength)
    ) {
      setSignCorrectLength(true);
    }
    else {
      setSignCorrectLength(false);
    }
  }, [messageText]);

  const handleCreateComment = () => {
    if (!isNotCorrectLength) {
      const data = {
        userId: userId,
        trainingId: trainingId,
        rating: currentRating,
        message: messageText
      };
      dispatch(postComment(data));
      setSignDone(true);
    }
  };

  useEffect(() => {
    if (!isErrorPost && isDone && onClose) {
      onClose();
    }
  }, [dispatch, onClose, isDone, isErrorPost, trainingId]
  );

  if (isErrorPost) {
    toast.warn('Сервер не доступен. Попробуйте зайти позднее');
  }

  return (
    <section className="popup">
      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Оставить отзыв</h2>
          <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content popup__content--feedback">
          <h3 className="popup__feedback-title">Оцените тренировку</h3>
          <ul className="popup__rate-list">
            {RATINGS.map((el) => (
              <li className="popup__rate-item" key={el}>
                <div className="popup__rate-item-wrap">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      aria-label={`оценка ${el}.`}
                      id={el.toString()}
                      value={el}
                      checked={el === currentRating}
                      required
                      onChange={handleRatingChange}
                    />
                    <span className="popup__rate-number">{el}</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
            <div className="popup__feedback-textarea">
              <div className="custom-textarea">
                <label>
                  <span className="custom-input--error">
                    <textarea name="description" placeholder=" " onChange={handleMessageChange}></textarea>
                    {isNotCorrectLength &&
                      <span className="custom-textarea__error">Минимальная длина 100 символ. Максимальная длина 1024 символов</span>}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="popup__button">
            <button
              className="btn"
              type="button"
              disabled={isErrorPost || isDone}
              onClick={handleCreateComment}
            >Продолжить
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
