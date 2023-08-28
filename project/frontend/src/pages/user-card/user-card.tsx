import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { StatusRequest, UserRole } from '../../types/user';
import { getSignUserLoading, getSignUserOtherLoading, getUser, getUserOther } from '../../store/user-process/selectors';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import TrainingCard from '../../components/training-card/training-card';
import { getCoachTrainings, getIsCoachTrainingsLoading } from '../../store/trainings-data/selectors';
import { TypeRequest } from '../../types/training';
import { getSignSubscrLoadDelete, getSignSubscrLoadPost } from '../../store/subscribe-data/selectors';
import { getSignLoadPost } from '../../store/request-data/selectors';
import { getSignFriendLoadDelete, getSignFriendLoadPost } from '../../store/friends-data/selectors';
import PopupWindow from '../../components/popup-window/popup-window';
import PopupCertificates from '../../components/popup-certificates/popup-certificates';
import PopupMap from '../../components/popup-map/popup-map';
import Trainings from './trainings';
import { deleteCoachFriend } from '../../store/api-actions/api-actions-coach';
import { deleteFriend, postFriend } from '../../store/api-actions/api-actions-friends';
import { createRequest } from '../../store/api-actions/api-actions-request';
import { fetchCoachOtherTrainings } from '../../store/api-actions/api-actions-trainings';
import { fetchUserOther, deleteSubscribe, createSubscribe } from '../../store/api-actions/api-actions-user';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 4,
  }
};

export default function UserCardPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const isUserLoading = useAppSelector(getSignUserLoading);
  const currentIsCoach = user.role === UserRole.Coach;
  const userOther = useAppSelector(getUserOther);
  const isUserOtherLoading = useAppSelector(getSignUserOtherLoading);
  const isCoach = userOther && userOther.role === UserRole.Coach;
  const coachTrainings = useAppSelector(getCoachTrainings);
  const isCoachTrainingsLoading = useAppSelector(getIsCoachTrainingsLoading);
  const isSubscrLoadDelete = useAppSelector(getSignSubscrLoadDelete);
  const isSubscrLoadPost = useAppSelector(getSignSubscrLoadPost);
  const isReqLoadPost = useAppSelector(getSignLoadPost);
  const isFriendLoadDelete = useAppSelector(getSignFriendLoadDelete);
  const isFriendLoadPost = useAppSelector(getSignFriendLoadPost);
  const [isSubscribe, setSubscribe] = useState<boolean | undefined>(userOther?.isSubscribe);
  const [isRequestPersonal, setRequestPersonal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalMap, setShowModalMap] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchUserOther(params.id));
      dispatch(fetchCoachOtherTrainings(params.id));
      setSubscribe(userOther?.isSubscribe);
    }
  }, [dispatch, params.id, userOther?.isSubscribe]);

  const handleDeleteFriend = () => {
    if (params.id) {
      currentIsCoach ? dispatch(deleteCoachFriend(params.id)) : dispatch(deleteFriend(params.id));
      dispatch(fetchUserOther(params.id));
    }
  };

  const handleAddFriend = () => {
    if (params.id) {
      dispatch(postFriend(params.id));
      dispatch(fetchUserOther(params.id));
    }
  };

  const handleRequestPersonal = () => {
    if (params.id) {
      const data = {
        userId: params.id,
        statusRequest: StatusRequest.Pending,
        typeRequest: TypeRequest.Personal
      };
      dispatch(createRequest(data));
      setRequestPersonal(true);
    }
  };

  const handleSubscribe = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (params.id) {
      if (isSubscribe === true) {
        setSubscribe(false);
        dispatch(deleteSubscribe(params.id));
      } else {
        setSubscribe(true);
        dispatch(createSubscribe(params.id));
      }
    }
  };

  const togglePopup = () => {
    setShowModal(!showModal);
  };

  const togglePopupMap = () => {
    setShowModalMap(!showModalMap);
  };
  if (!userOther) {
    return null;
  }

  if (isUserLoading || (isCoach && isCoachTrainingsLoading) || isUserOtherLoading || isFriendLoadPost || isFriendLoadDelete) {
    return (<LoadingScreen />);
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button" onClick={() => navigate(-1)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
                  <div className="user-card-coach__wrapper">
                    <div className="user-card-coach__card">
                      <div className="user-card-coach__content">
                        <div className="user-card-coach__head">
                          <h2 className="user-card-coach__title">{userOther.name}</h2>
                        </div>
                        <div className="user-card-coach__label">
                          <Link to='/' onClick={(evt) => { evt.preventDefault(); setShowModalMap(!showModalMap); }}>
                            <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                              <use xlinkHref="#icon-location"></use>
                            </svg>
                            <span>{userOther.location}</span>
                          </Link>
                          {showModalMap &&
                            <PopupWindow onClose={togglePopupMap}>
                              <PopupMap name={userOther.name} metro={userOther.location} onClose={togglePopupMap} />
                            </PopupWindow>}
                        </div>
                        <div className="user-card-coach__status-container">
                          {isCoach &&
                            <div className="user-card-coach__status user-card-coach__status--tag">
                              <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg><span>Тренер</span>
                            </div>}
                          {isCoach && userOther.isPersonal &&
                            <div className="user-card-coach__status user-card-coach__status--check">
                              <span>Готов тренировать</span>
                            </div>}
                          {isCoach && !userOther.isPersonal &&
                            <div className="user-card-coach-2__status user-card-coach-2__status--check">
                              <span>Не готов тренировать</span>
                            </div>}
                        </div>
                        <div className="user-card-coach__text">
                          {userOther.description}
                        </div>
                        {isCoach &&
                          <button className="btn-flat user-card-coach__sertificate" type="button" onClick={togglePopup}>
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-teacher"></use>
                            </svg><span>Посмотреть сертификаты</span>
                          </button>}
                        {isCoach && showModal &&
                          <PopupWindow onClose={togglePopup}>
                            <PopupCertificates coachInfo={userOther} onClose={togglePopup} />
                          </PopupWindow>}
                        <ul className="user-card-coach__hashtag-list">
                          {userOther.trainingType.map((el) => (
                            <li className="user-card-coach__hashtag-item" key={el}>
                              <div className="hashtag"><span>#{el}</span></div>
                            </li>)
                          )}
                        </ul>
                        {userOther?.isFriend &&
                          <button
                            className="btn btn--outlined user-card-coach-2__btn"
                            type="button"
                            onClick={handleDeleteFriend}
                            disabled={isFriendLoadDelete || isFriendLoadPost}
                          >Удалить из друзей
                          </button>}
                        {!currentIsCoach && !userOther?.isFriend &&
                          <button
                            className="btn user-card-coach__btn"
                            type="button"
                            onClick={handleAddFriend}
                            disabled={isFriendLoadDelete || isFriendLoadPost}
                          >Добавить в друзья
                          </button>}
                      </div>
                      <div className="user-card-coach__gallary">
                        <img src={userOther.avatarPath} width="334" height="573" alt="photo1" />
                      </div>
                    </div>
                    {isCoach &&
                      <div className="user-card-coach__training conteiner-user-revers">
                        {coachTrainings.length !== 0 &&
                          (
                            <Carousel
                              responsive={responsive}
                              arrows={false}
                              containerClass="container conteiner-user_order user-card-coach__training-list"
                              itemClass="user-card-coach__training-item"
                              focusOnSelect
                              pauseOnHover
                              slidesToSlide={1}
                              renderButtonGroupOutside
                              customButtonGroup={
                                <Trainings />
                              }
                            >
                              {
                                coachTrainings.map((el) =>
                                  (
                                    <div className="thumbnail-training" key={el.id}>
                                      <TrainingCard training={el} />
                                    </div>
                                  )
                                )
                              }
                            </Carousel>
                          )}
                        <form className="user-card-coach__training-form">
                          {isCoach && userOther.isPersonal &&
                            <button
                              className="btn user-card-coach__btn-training"
                              type="button"
                              disabled={isRequestPersonal || isReqLoadPost}
                              onClick={handleRequestPersonal}
                            >
                              Хочу персональную тренировку
                            </button>}
                          <div className="user-card-coach__training-check">
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  value="user-agreement-1"
                                  name="user-agreement"
                                  onChange={handleSubscribe}
                                  checked={isSubscribe}
                                  disabled={isSubscrLoadDelete || isSubscrLoadPost}
                                />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

