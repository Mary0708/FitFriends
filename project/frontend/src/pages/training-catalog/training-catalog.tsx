import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import {
  DEFAULT_CALORIES_STEP,
  DEFAULT_PRICE_NUMBER,
  DEFAULT_RATING_STEP,
  MAX_CALORIES_VALUE,
  MAX_RATING_NUMBER,
  MIN_CALORIES_VALUE,
  MIN_RATING_NUMBER,
  MAX_PRICE_NUMBER,
  DEFAULT_TRAININGS_CATALOG_NUMBER,
} from '../../const';
import { Query, TRAINING_ARR, TrainingType } from '../../types/training';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { getCountAllTrainings, getTrainings, getTrainingsDataLoadingStatus } from '../../store/trainings-data/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import TrainingCard from '../../components/training-card/training-card';
import { fetchCatalogTrainings } from '../../store/api-actions/api-actions-trainings';

export default function TrainingsCatalogPage() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const total = useAppSelector(getCountAllTrainings);
  const isTrainingDataLoading = useAppSelector(getTrainingsDataLoadingStatus);
  const trainings = useAppSelector(getTrainings);
  const trainingsNumber = trainings ? trainings.length : 0;
  const pagesNumber = Math.ceil(trainingsNumber / DEFAULT_TRAININGS_CATALOG_NUMBER);
  const [query, setQuery] = useState<Query>({ limit: DEFAULT_TRAININGS_CATALOG_NUMBER, page: 1 });


  const [formValue, setValue] = useState({
    minPrice: DEFAULT_PRICE_NUMBER,
    maxPrice: MAX_PRICE_NUMBER,
    minCalories: MIN_CALORIES_VALUE,
    maxCalories: MAX_CALORIES_VALUE,
    minRating: MIN_RATING_NUMBER,
    maxRating: MAX_RATING_NUMBER,
  });

  const [sliderValue, setSliderValue] = useState({
    minPrice: DEFAULT_PRICE_NUMBER,
    maxPrice: total.maxPrice,
    minCalories: MIN_CALORIES_VALUE,
    maxCalories: MAX_CALORIES_VALUE,
    minRating: MIN_RATING_NUMBER,
    maxRating: MAX_RATING_NUMBER,
  });

  const filterChangeHandle = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const { value, name } = evt.target;
    const valueNum = Math.max(0, Number(value));
    setValue({ ...formValue, [name]: Number(valueNum) });

    if (name === 'minPrice' && Number(valueNum) <= formValue.maxPrice) {
      setQuery({ ...query, price: [Number(valueNum), formValue.maxPrice] });
    }
    if (name === 'maxPrice' && Number(valueNum) >= formValue.minPrice) {
      setQuery({ ...query, price: [formValue.minPrice, Number(valueNum)] });
    }
    if ((name === 'maxPrice' && Number(valueNum) === 0 && formValue.minPrice === 0)
      || (name === 'minPrice' && Number(valueNum) === 0 && formValue.maxPrice === 0)) {
      setQuery({ ...query, price: undefined });
    }

    if (name === 'minCalories' && Number(valueNum) <= formValue.maxCalories) {
      setQuery({ ...query, caloriesReset: [Number(valueNum), formValue.maxCalories] });
    }
    if (name === 'maxCalories' && Number(valueNum) >= formValue.minCalories) {
      setQuery({ ...query, caloriesReset: [formValue.minCalories, Number(valueNum)] });
    }
    if ((name === 'maxCalories' && Number(valueNum) === 0 && formValue.minCalories === 0)
      || (name === 'minCalories' && Number(valueNum) === 0 && formValue.maxCalories === 0)) {
      setQuery({ ...query, caloriesReset: undefined });
    }

    if (name === 'specialisation') {
      const isChecked = !!(query && query?.trainingType && query?.trainingType.find((el) => el === value as TrainingType));

      if (isChecked && query.trainingType) {
        const currentArr = query.trainingType.filter((el) => el !== value);
        evt.target.removeAttribute('checked');
        currentArr.length === 0 ? setQuery({ ...query, trainingType: undefined }) : setQuery({ ...query, trainingType: currentArr });
      }
      else {
        const currentArr = query && query.trainingType ? query.trainingType : [];
        setQuery({ ...query, trainingType: [...currentArr, value as TrainingType] });
        evt.target.setAttribute('checked', 'true');
      }
    }
    if (name === 'sort') {
      evt.target.setAttribute('checked', 'true');
      if (value === 'sort_asc') {
        setQuery({ ...query, sortPrice: 'asc', price: undefined });
      }
      if (value === 'sort_desc') {
        setQuery({ ...query, sortPrice: 'desc', price: undefined });
      }
      if (value === 'sort_free') {
        setQuery({ ...query, price: [0, 0] });
      }
    }
  };
  useEffect(() => {
    dispatch(fetchCatalogTrainings(query));
  }, [dispatch, query]);

  if (isTrainingDataLoading) {
    <LoadingScreen />;
  }
  if (!trainings) {
    return null;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
                    type="button"
                    onClick={() => { dispatch(fetchCatalogTrainings()); navigate(-1); }}
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <form className="gym-catalog-form__form">
                    <div className="gym-catalog-form__block gym-catalog-form__block--price">
                      <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            value={formValue.minPrice}
                            onChange={filterChangeHandle}
                          />
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            value={formValue.maxPrice}
                            onChange={filterChangeHandle}
                          />
                          <label htmlFor="text-max">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <MultiRangeSlider
                          min={DEFAULT_PRICE_NUMBER}
                          max={total.maxPrice}
                          step={100}
                          style={{ border: 'none', boxShadow: 'none', padding: '15px 10px' }}
                          ruler='false'
                          barLeftColor='black'
                          barInnerColor='black'
                          barRightColor='black'
                          thumbLeftColor='black'
                          thumbRightColor='black'
                          minValue={sliderValue.minPrice}
                          maxValue={sliderValue.maxPrice}
                          onInput={(e: ChangeResult) => {
                            setSliderValue({ ...sliderValue, minPrice: e.minValue, maxPrice: e.maxValue });
                            setQuery({ ...query, price: [Number(e.minValue), Number(e.maxValue)]});
                          }}
                        />
                      </div>
                      <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                        <h4 className="gym-catalog-form__block-title">Калории</h4>
                        <div className="filter-calories">
                          <div className="filter-calories__input-text filter-calories__input-text--min">
                            <input
                              type="number"
                              id="minCalories"
                              name="minCalories"
                              value={formValue.minCalories}
                              onChange={filterChangeHandle}
                            />
                            <label htmlFor="minCalories">от</label>
                          </div>
                          <div className="filter-calories__input-text filter-calories__input-text--max">
                            <input
                              type="number"
                              id="maxCalories"
                              name="maxCalories"
                              value={formValue.maxCalories}
                              onChange={filterChangeHandle}
                            />
                            <label htmlFor="maxCalories">до</label>
                          </div>
                        </div>
                        <div className="filter-range">
                          <MultiRangeSlider
                            min={MIN_CALORIES_VALUE}
                            max={MAX_CALORIES_VALUE}
                            step={DEFAULT_CALORIES_STEP}
                            style={{ border: 'none', boxShadow: 'none', padding: '15px 10px' }}
                            ruler='false'
                            barLeftColor='black'
                            barInnerColor='black'
                            barRightColor='black'
                            thumbLeftColor='black'
                            thumbRightColor='black'
                            minValue={formValue.minCalories}
                            maxValue={formValue.maxCalories}
                            onChange={(e: ChangeResult) => {
                              setValue({ ...formValue, minCalories: e.minValue, maxCalories: e.maxValue });
                              setQuery({ ...query, caloriesReset: [Number(e.minValue), Number(e.maxValue)] });
                            }}
                          />
                        </div>
                      </div>
                      <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                        <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
                        <div className="filter-raiting">
                          <MultiRangeSlider
                            min={MIN_RATING_NUMBER}
                            max={MAX_RATING_NUMBER}
                            step={DEFAULT_RATING_STEP}
                            style={{ border: 'none', boxShadow: 'none', padding: '15px 10px' }}
                            ruler='false'
                            barLeftColor='black'
                            barInnerColor='black'
                            barRightColor='black'
                            thumbLeftColor='black'
                            thumbRightColor='black'
                            minValue={formValue.minRating}
                            maxValue={formValue.maxRating}
                            onChange={(e: ChangeResult) => {
                              setValue({ ...formValue, minRating: e.minValue, maxRating: e.maxValue });
                              setQuery({ ...query, rating: [Number(e.minValue), Number(e.maxValue)] });
                            }}
                          />
                        </div>
                      </div>
                      <div className="gym-catalog-form__block gym-catalog-form__block--type">
                        <h4 className="gym-catalog-form__block-title">Тип</h4>
                        <ul className="gym-catalog-form__check-list">
                          {TRAINING_ARR.map((el) => (
                            <li className="gym-catalog-form__check-list-item" key={el}>
                              <div className="custom-toggle custom-toggle--checkbox">
                                <label >
                                  <input
                                    type="checkbox"
                                    name="trainingType"
                                    value={el}
                                    id={el}
                                    onChange={filterChangeHandle}
                                  />
                                  <span className="custom-toggle__icon">
                                    <svg width="9" height="6" aria-hidden="true">
                                      <use xlinkHref="#arrow-check"></use>
                                    </svg>
                                  </span>
                                  <span className="custom-toggle__label">{el}</span>
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
                        <div className="btn-radio-sort gym-catalog-form__radio">
                          <label>
                            <input type="radio" name="sort" value="sort_asc" onChange={filterChangeHandle} />
                            <span className="btn-radio-sort__label">Дешевле</span>
                          </label>
                          <label>
                            <input type="radio" name="sort" value="sort_desc" onChange={filterChangeHandle} />
                            <span className="btn-radio-sort__label">Дороже</span>
                          </label>
                          <label>
                            <input type="radio" name="sort" value="sort_free" onChange={filterChangeHandle} />
                            <span className="btn-radio-sort__label">Бесплатные</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {trainings.map((training) =>
                    (
                      <li className="my-trainings__item" key={training.id}>
                        <div className="thumbnail-training" key={training.id}>
                          <TrainingCard training={training} />
                        </div>
                      </li>)
                  )}
                </ul>
                <div className="show-more training-catalog__show-more">
                  {pagesNumber !== query.page &&
                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={() => setQuery({ ...query, page: query.page ? query.page + 1 : 1 })}
                    >Показать еще
                    </button>}
                  {pagesNumber === query.page && pagesNumber !== 1 &&
                    <button className="btn show-more__button" type="button" onClick={scrollToTop}>Вернуться в начало</button>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
