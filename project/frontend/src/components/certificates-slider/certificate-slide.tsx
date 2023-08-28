import { ChangeEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { FileType } from '../../types/user';
import { postCertificate } from '../../store/api-actions/api-actions-coach';

type PropBtn ={
    next?: () => void;
    previous?: () => void;
    isPopup?: boolean;
  }

export default function CertificateSlide({ next, previous, isPopup }: PropBtn) {
  const dispatch = useAppDispatch();
  const handlePDFUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    dispatch(postCertificate({ fileCertificate: evt.target.files[0] } as FileType));
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="personal-account-coach__label-wrapper">
      <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
      {!isPopup &&
                <label className="btn-flat btn-flat--underlined personal-account-coach__button">
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-import"></use>
                  </svg><span>Загрузить</span>
                  <input
                    className="visually-hidden"
                    type="file"
                    name="import"
                    accept=".pdf"
                    ref={inputRef}
                    required
                    onChange={handlePDFUpload}
                  />
                </label>}
      <div className="personal-account-coach__controls">
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
