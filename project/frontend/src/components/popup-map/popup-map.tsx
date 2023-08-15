import { POINT_ARR } from '../../const';
import { Location } from '../../types/location';
import MapView from '../map/map';

type Prop = {
  onClose?: () => void;
  name: string;
  metro: Location;
}

export default function PopupMap({ name, metro, onClose }: Prop): JSX.Element {
  const currentPoint = POINT_ARR.find((el) => el.name === metro)?.location;
  return (
    <section className="popup">
      <div className="popup__wrapper popup__wrapper--map">
        <div className="popup-head popup-head--address">
          <h2 className="popup-head__header">{name}</h2>
          <p className="popup-head__address">
            <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg><span>м. {metro}</span>
          </p>
          <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content-map">

          {currentPoint && <MapView position={currentPoint} />}
        </div>
      </div>
    </section>
  );
}
