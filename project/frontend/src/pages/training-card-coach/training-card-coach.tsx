import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import PopupFeedback from '../../components/popup-feedback/popup-feedback';
import CommentCard from '../../components/comment-card/comment-card';
import PopupWindow from '../../components/popup-window/popup-window';
import { getOrder } from '../../store/orders-data/selectors';
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } from '../../const';
import { getTraining } from '../../store/trainings-data/selectors';
import { getUser } from '../../store/user-process/selectors';
import { fetchUserOrder, reduceOrder } from '../../store/api-actions/api-actions-order';
import { fetchCoachTraining, editTraining } from '../../store/api-actions/api-actions-trainings';
import { getComments } from '../../store/comment-data/selectors';

enum FormFieldName {
  title = 'title',
  levelTraining = 'levelTraining',
  trainingType = 'trainingType',
  trainingTime = 'trainingTime',
  price = 'price',
  caloriesReset = 'caloriesReset',
  description = 'description',
  video = 'video',
  isSpecial = 'isSpecial'
}

export default function TrainingCardCoach(): JSX.Element {
  const training = useAppSelector(getTraining);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setSignEditForm] = useState<boolean>(false);
  const [isDiscount, setDiscount] = useState<boolean>(training.isSpecial ? training.isSpecial : false);
  const currentOrder = useAppSelector(getOrder);
  const [isHiddenStop, setSignHiddenStop] = useState<boolean>(false);
  const [isDisabledTraining, setSignDisabledTraining] = useState<boolean>(currentOrder?.isDone || currentOrder?.isDone === undefined);

  const TRAINING_INFO = {
    title: training.title,
    price: training.price,
    description: training.description,
    isSpecial: training.isSpecial,
    videoPath: training.videoPath
  };
  const [currentInfo, setInfo] = useState(TRAINING_INFO);
  const [fileVideo, setFileVideo] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const togglePopup = () => {
    if (showModal) {
      dispatch(fetchUserOrder(training.id));
      dispatch(fetchCoachTraining(training.id));
    }
    setShowModal(!showModal);
  };

  const handleVideoSubmit = () => {
    const data = {
      id: training.id,
      video: String(fileVideo),
      fileVideo: fileVideo,
    };
    dispatch(editTraining(data));
  };

  const handleEditButtonClick = () => {
    setSignEditForm((previsEdit) => !previsEdit);
  };

  const handleInfoChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    if (name === 'isSpecial') {
      const signSpecialOffer = !currentInfo.isSpecial;
      setInfo({ ...currentInfo, isSpecial: signSpecialOffer });
    } else {
      setInfo({ ...currentInfo, [name]: value });
    }
  };

  const handleVideoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setFileVideo(evt.target.files[0]);
  };

  const handleVideoDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setInfo({ ...currentInfo, videoPath: undefined });
      setFileVideo(undefined);
    }
  };

  const handleSetDiscount = () => {
    if (currentInfo.price) {
      setInfo({ ...currentInfo, price: Math.round(isDiscount ? currentInfo.price / 0.9 : currentInfo.price * 0.9) });
    }
    setDiscount((prevIsDiscount) => !prevIsDiscount);
  };

  const handleStartButtonClick = () => {
    if (currentOrder?.id && !isHiddenStop) {
      dispatch(reduceOrder(currentOrder.id));
      setSignHiddenStop(true);
    }
    if (isHiddenStop) {
      setSignHiddenStop(false);
      dispatch(fetchUserOrder(training.id));
    }
  };

  useEffect(()=>{
    setSignDisabledTraining(currentOrder?.isDone || currentOrder?.isDone === undefined);
  }, [currentOrder?.isDone, isHiddenStop]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <button
                  className="btn-flat btn-flat--underlined reviews-side-bar__back"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg><span>Назад</span>
                </button>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <ul className="reviews-side-bar__list">
                  {comments.map((el) =>
                    (
                      <li className="reviews-side-bar__item" key={el.id}>
                        <CommentCard comment={el} />
                      </li>)
                  )}
                </ul>
                <button
                  className="btn btn--medium reviews-side-bar__button"
                  type="button"
                  onClick={togglePopup}
                >
                  Оставить отзыв
                </button>
                {showModal &&
                  <PopupWindow onClose={togglePopup}>
                    <PopupFeedback trainingId={training.id} userId={user.id} onClose={togglePopup} />
                  </PopupWindow>}
              </aside>
              <div className="training-card training-card--edit">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <img src={training.coachAvatarPath} width="64" height="64" alt="Изображение тренера" />
                        </picture>
                      </div>
                      <div className="training-info__coach-info"><span className="training-info__label">Тренер</span>
                        <span className="training-info__name">{training.coachName}</span>
                      </div>
                    </div>
                    {!isEdit &&
                      (
                        <button
                          className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
                          type="button"
                          onClick={handleEditButtonClick}
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                          </svg><span>Редактировать</span>
                        </button>
                      )}
                    {isEdit &&
                      (
                        <button
                          className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--edit"
                          type="submit"
                          form="training"
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                          </svg><span>Сохранить</span>
                        </button>
                      )}
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label><span className="training-info__label">Название тренировки</span>
                              <input
                                type="text"
                                name={FormFieldName.title}
                                required
                                minLength={MIN_TITLE_LENGTH}
                                maxLength={MAX_TITLE_LENGTH}
                                disabled={!isEdit}
                                value={currentInfo.title}
                                onChange={handleInfoChange}
                              />
                            </label>
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
                            <label><span className="training-info__label">Описание тренировки</span>
                              <textarea
                                id={FormFieldName.description}
                                name={FormFieldName.description}
                                placeholder=" "
                                disabled={!isEdit}
                                value={currentInfo.description}
                                onChange={handleInfoChange}
                              >
                              </textarea>
                            </label>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label><span className="training-info__label">Рейтинг</span>
                              <span className="training-info__rating-icon">
                                <svg width="18" height="18" aria-hidden="true">
                                  <use xlinkHref="#icon-star"></use>
                                </svg>
                              </span>
                              <input type="number" name="rating" value={training.rating} disabled />
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{training.trainingType}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{training.gender}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{training.caloriesReset}ккал</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{training.trainingTime}</span></div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label>
                              <span className="training-info__label">Стоимость</span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name={FormFieldName.price}
                                  required
                                  min="0"
                                  disabled={!isEdit}
                                  value={currentInfo.price}
                                  onChange={handleInfoChange}
                                />
                                <span className="custom-input__text">₽</span>
                              </span>
                            </label>
                            <div className="training-info__error">Введите число</div>
                          </div>
                          <button
                            className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                            type="button"
                            onClick={handleSetDiscount}
                            disabled={!isEdit}
                          >
                            <svg width="14" height="14" aria-hidden="true">
                              <use xlinkHref="#icon-discount"></use>
                            </svg><span>{isDiscount ? 'Отменить скидку' : 'Сделать скидку 10%'}</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="training-video">
                  <h2 className="training-video__title">Видео</h2>
                  <div className="training-video__video">
                    <div className="training-video__thumbnail">
                      <input
                        className={`${currentInfo.videoPath || fileVideo || !isEdit ? 'visually-hidden' : ''}`}
                        type="file"
                        name="import"
                        tabIndex={-1}
                        accept=".mov, .avi, .mp4"
                        ref={inputRef}
                        required
                        onChange={handleVideoUpload}
                        disabled={!isEdit}
                      />
                      {fileVideo &&
                        <video src={URL.createObjectURL(fileVideo)} width="922" height="566" controls={isHiddenStop}></video>}
                      {!fileVideo && currentInfo.videoPath &&
                        <video src={currentInfo.videoPath} width="922" height="566" controls={isHiddenStop}></video>}
                    </div>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    <button
                      className="btn training-video__button training-video__button--start"
                      type="button"
                      disabled={isDisabledTraining}
                      onClick={handleStartButtonClick}
                    >{isHiddenStop ? 'Закончить' : 'Приступить'}
                    </button>
                  </div>
                  {isEdit &&
                    <div className="training-video__edit-buttons" style={{ display: 'flex' }}>
                      <button
                        className="btn"
                        type="button"
                        onClick={handleVideoSubmit}
                      >Сохранить
                      </button>
                      <button
                        className="btn btn--outlined"
                        type="button"
                        onClick={handleVideoDelete}
                      >Удалить
                      </button>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
