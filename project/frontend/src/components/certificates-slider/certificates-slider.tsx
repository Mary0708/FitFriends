import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CertificateCard from '../certificate-card/certificate-card';
import { User } from '../../types/user';
import CertificateSlide from './certificate-slide';

type Prop ={
  coachInfo: User;
  isPopup?: boolean;
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

const responsivePopup = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 1,
  }
};

export default function CertificateSlider ({coachInfo, isPopup}: Prop) {
  const resp = isPopup ? responsivePopup : responsive;
  const certificateArr = coachInfo.certificatesPath ? coachInfo.certificatesPath : [];
  return (
    <div className="personal-account-coach__additional-info conteiner-revers">
      <Carousel
        responsive={resp}
        arrows={false}
        containerClass="container conteiner_order"
        focusOnSelect
        pauseOnHover
        slidesToSlide={1}
        renderButtonGroupOutside
        customButtonGroup={
          <CertificateSlide isPopup={isPopup}/>
        }
      >
        {certificateArr.length !== 0 &&
          certificateArr.map((el)=>
            <CertificateCard certificatePath={el.certificatePath} certificateId={el.certificateId} key={el.certificateId}/>
          )}
      </Carousel>
    </div>
  );
}
