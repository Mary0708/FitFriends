import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import { getCountFiends, getFriends, getFriendsDataLoadingStatus } from '../../store/friends-data/selectors';

import FriendCard from '../friend-card/friend-card';
import { UserRole } from '../../types/user';
import useScrollToUp from '../../hooks/use-scroll-to-up/use-scroll-to-up';
import { useEffect, useState } from 'react';
import { Query } from '../../types/training';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { DEFAULT_USERS_CATALOG_NUMBER } from '../../const';
import { fetchUserFriends } from '../../store/api-actions/api-actions-friends';

function FriendsListUserPage(): JSX.Element {
  useScrollToUp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const friends = useAppSelector(getFriends);
  const isFriendsDataLoading = useAppSelector(getFriendsDataLoadingStatus);
  const totalFriends = useAppSelector(getCountFiends);
  const totalPage = Math.ceil(totalFriends / DEFAULT_USERS_CATALOG_NUMBER);

  const [query, setQuery] = useState<Query>({limit: DEFAULT_USERS_CATALOG_NUMBER, page: 1});
  useEffect(()=>{
    dispatch(fetchUserFriends(query));
  }, [dispatch, query]);

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isFriendsDataLoading) {
    <LoadingScreen/>;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button
                className="btn-flat friends-list__back"
                type="button"
                onClick={() => navigate(-1)}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {friends && friends.map((el) =>
                  (
                    <li className="friends-list__item" key={el.id}>
                      <FriendCard user={el} currentUserRole={UserRole.User}/>
                    </li>)
                )}
              </ul>
              <div className="show-more friends-list__show-more">
                {totalPage !== query.page &&
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={() => setQuery({...query, page: query.page ? query.page + 1 : 1})}
                  >Показать еще
                  </button> }
                {totalPage === query.page && totalPage !== 1 &&
                  <button className="btn show-more__button" type="button" onClick={scrollToTop}>Вернуться в начало</button>}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FriendsListUserPage;
