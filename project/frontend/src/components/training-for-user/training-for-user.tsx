import Carousel from 'react-multi-carousel';
import { Training } from '../../types/training';
import { AppRoute, COUNT_TRAINING_FOR_YOU } from '../../const';
import FakeImg from '../fake-img/fake-img';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import SpecialForYou from './special-for-you';
import { fetchUserOrder } from '../../store/api-actions/api-actions-order';
import { fetchCoachTraining, fetchComments } from '../../store/api-actions/api-actions-trainings';

type Props = {
  userTrainings: Training[];
}
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
  }
};

export default function TrainingForUser({ userTrainings }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routeChangeCard = (id: string) => {
    dispatch(fetchCoachTraining(id));
    dispatch(fetchUserOrder(id));
    dispatch(fetchComments(id));
    const path = `${AppRoute.Training}/${id}`;
    navigate(path);
  };
  return (
    <section className="special-for-you">
      {userTrainings.length !== 0 &&
        (
          <div className="container">
            <div className="special-for-you__wrapper conteiner-main-revers">
              <Carousel
                responsive={responsive}
                arrows={false}
                containerClass="container conteiner_order"
                focusOnSelect
                pauseOnHover
                slidesToSlide={1}
                renderButtonGroupOutside
                customButtonGroup={
                  <SpecialForYou />
                }
              >
                {
                  userTrainings.slice(0, COUNT_TRAINING_FOR_YOU).map((el) =>
                    (
                      <div className="thumbnail-preview" key={el.id}>
                        <div className="thumbnail-preview__image">
                          <picture>
                            <source type="image/webp" srcSet="img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x" />
                            <img src="img/content/thumbnails/preview-03.jpg" srcSet="img/content/thumbnails/preview-03@2x.jpg 2x" width="452" height="191" alt="" />
                          </picture>
                        </div>
                        <div className="thumbnail-preview__inner">
                          <h3 className="thumbnail-preview__title">{el.title}</h3>
                          <div className="thumbnail-preview__button-wrapper">
                            <button
                              className="btn btn--small thumbnail-training__button-catalog"
                              type="button"
                              onClick={() => routeChangeCard(el.id)}
                            >Подробнее
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )
                }
              </Carousel>
            </div>
          </div>)}
      {userTrainings.length === 0 && (
        <FakeImg />
      )}
    </section>
  );
}

