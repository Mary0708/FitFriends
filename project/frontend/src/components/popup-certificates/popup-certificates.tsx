import CertificateSlider from '../certificates-slider/certificates-slider';
import { User } from '../../types/user';


type Prop = {
  onClose?: () => void;
  coachInfo: User;
}


export default function PopupCertificates({ coachInfo, onClose }: Prop): JSX.Element {
  return (
    <section className="popup">
      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Сертификаты тренера</h2>
          <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        {coachInfo.certificate &&
          <CertificateSlider coachInfo={coachInfo} isPopup />}
        {!coachInfo.certificate &&
          <div>Нет загруженных сертификатов</div>}
      </div>
    </section>
  );
}
