type Prop = {
    next?: () => void;
    previous?: () => void;
}

export default function Trainings({ next, previous }: Prop) {
  return (
    <div className="user-card-coach__training-head">
      <h2 className="user-card-coach__training-title">Тренировки</h2>

      <div className="user-card-coach__training-bts">
        <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back" onClick={() => previous?.()}>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
        </button>
        <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next" onClick={() => next?.()}>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
