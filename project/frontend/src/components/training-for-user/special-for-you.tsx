type Prop = {
    next?: () => void;
    previous?: () => void;
}

export default function SpecialForYou({ next, previous }: Prop) {
  return (
    <div className="special-for-you__title-wrapper">
      <h2 className="special-for-you__title">Специально подобрано для вас</h2>
      <div className="special-for-you__controls">
        <button
          className="btn-icon personal-account-coach__control"
          type="button"
          aria-label="previous"
          onClick={() => previous?.()}
        >
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg>
        </button>
        <button
          className="btn-icon personal-account-coach__control"
          type="button"
          aria-label="next"
          onClick={() => next?.()}
        >
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
