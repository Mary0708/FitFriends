import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Training } from '../../types/training';
import { COUNT_ORDER_DEFAULT } from '../../const';
import { toast } from 'react-toastify';
import { postOrder } from '../../store/api-actions-order';
import { getLoadingPost } from '../../store/orders-data/selectors';
import { getErrorPost } from '../../store/trainings-data/selectors';
import { PAY_OPTION, PaymentOption } from '../../types/order';

type Props = {
  training: Training;
  onClose: () => void;
}


export default function PopupBuy({ training, onClose }: Props): JSX.Element {
  const [countTraining, setCountTraining] = useState(COUNT_ORDER_DEFAULT);
  const dispatch = useAppDispatch();
  const [paymentType, setPaymentType] = useState<PaymentOption>();
  const [isNotPaymentType, setSignNotPaymentType] = useState(false);
  const isErrorPost = useAppSelector(getErrorPost);
  const isLoadingPost = useAppSelector(getLoadingPost);
  const [isDone, setSignDone] = useState(false);

  const handlePayChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setPaymentType(value as PaymentOption);
    evt.target.setAttribute('checked', 'true');
    setSignNotPaymentType(false);
  };

  const handleCreateOrder = () => {
    if (paymentType) {
      const data = {
        trainingId: training.id,
        trainingCount: countTraining,
        paymentOption: paymentType
      };
      dispatch(postOrder(data));
      setSignDone(true);
    }
    if (!paymentType) {
      setSignNotPaymentType(true);
    }
  };

  const handleCount = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (evt.currentTarget.name === 'minus') {
      setCountTraining(countTraining === 1 ? countTraining : countTraining - 1);
    } else {
      setCountTraining(countTraining + 1);
    }
  };

  const handleEscapeKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeydown);
    return () => window.removeEventListener('keydown', handleEscapeKeydown);
  });

  if (isErrorPost) {
    toast.warn('Сервер не доступен. Попробуйте зайти позднее');
  }

  return (
    <div className="popup-form popup-form--buy">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Купить тренировку</h2>
            <button onClick={onClose} className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close">
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--purchases">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <img src={training.photo} width="98" height="80" alt="" />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">{training.title}</h3>
                <p className="popup__product-price">{training.price} ₽</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <button onClick={handleCount} className="btn-icon btn-icon--quantity" type="button" aria-label="minus">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>
                  </button>
                  <div className="input-quantity__input">
                    <label>
                      <input type="text" value={countTraining} size={2} readOnly />
                    </label>
                  </div>
                  <button onClick={handleCount} className="btn-icon btn-icon--quantity" type="button" aria-label="plus">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <section className="payment-method">
              {!isNotPaymentType && <h4 className="payment-method__title">Выберите способ оплаты</h4>}
              {isNotPaymentType && <h4 className="payment-method__title" style={{ color: 'red' }}>Выберите способ оплаты</h4>}
              <ul className="payment-method__list">

                {PAY_OPTION.map((el) =>
                  (
                    <li className="payment-method__item" key={el}>
                      <div className="btn-radio-image">
                        <label>
                          {el === PaymentOption.Visa ?
                            (
                              <input
                                type="radio"
                                name="payment"
                                id={el}
                                value={el}
                                required
                                onChange={handlePayChange}
                              />
                            )
                            :
                            (
                              <input
                                type="radio"
                                name="payment"
                                id={el}
                                value={el}
                                onChange={handlePayChange}
                              />
                            )}
                          <span className="btn-radio-image__image">
                            <svg width="58" height="20" aria-hidden="true">
                              <use xlinkHref={`#${el}-logo`}></use>
                            </svg>
                          </span>
                        </label>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                <use xlinkHref="#dash-line"></use>
              </svg>
              <p className="popup__total-price">{Number(training.price) * countTraining} ₽</p>
            </div>
            <div className="popup__button">
              <button
                onClick={handleCreateOrder}
                className="btn"
                type="button"
                disabled={isLoadingPost || isErrorPost || isDone}
              >
                Купить
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
