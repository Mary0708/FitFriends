import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { COUNT_USERS_READY } from '../../const';
import FakeImg from '../fake-img/fake-img';
import UserItem from '../user-item/user-item';
import { User } from '../../types/user';
import LookForCompanySlider from './look-for-company-slider';

type Props = {
  users: User[];
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

export default function LookForCompany({ users }: Props): JSX.Element {
  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper conteiner-main-revers">
          {users.length !== 0 &&
            <Carousel
              responsive={responsiveFour}
              arrows={false}
              containerClass="container conteiner_order"
              focusOnSelect
              pauseOnHover
              slidesToSlide={1}
              renderButtonGroupOutside
              customButtonGroup={<LookForCompanySlider />}
            >
              {users.slice(0, COUNT_USERS_READY).map((el) =>
                (
                  <div className="look-for-company__item" key={el.id}>
                    <UserItem user={el} isMainPage />
                  </div>)
              )}
            </Carousel>}
          {users.length === 0 && (<FakeImg />)}
        </div>
      </div>
    </section>
  );
}

