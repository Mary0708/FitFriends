import Carousel from 'react-multi-carousel';
import { Training } from '../../types/training';
import 'react-multi-carousel/lib/styles.css';
import './popular-trainings.css';
import FakeImg from '../fake-img/fake-img';
import TrainingCard from '../training-card/training-card';
import PopularTrainingsButton from './popular-training-slider';

type Props = {
  trainings: Training[];
}
const responsiveFour = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 4,
  }
};


export default function PopularTrainings({ trainings }: Props): JSX.Element {
  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper conteiner-main-revers">
          {trainings.length !== 0 &&
            (
              <Carousel
                responsive={responsiveFour}
                arrows={false}
                containerClass="container conteiner_order popular-trainings__list"
                itemClass="popular-trainings__item"
                focusOnSelect
                pauseOnHover
                slidesToSlide={1}
                renderButtonGroupOutside
                customButtonGroup={
                  <PopularTrainingsButton />
                }
              >
                {
                  trainings.map((el) =>
                    (
                      <div className="thumbnail-training" key={el.id}>
                        <TrainingCard training={el} />
                      </div>
                    )
                  )
                }
              </Carousel>
            )}
          {trainings.length === 0 && (
            <FakeImg />
          )}
        </div>
      </div>
    </section>
  );
}
