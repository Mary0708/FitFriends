import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postTraining } from '../../store/api-actions-trainings';
import { USER_GENDER_ARR, Gender } from '../../types/user';
import { DescriptionLn, MAX_TITLE_LENGTH, MIN_TITLE_LENGTH } from '../../const';
import { getIsLoadingPostTraining, getErrorPost } from '../../store/trainings-data/selectors';
import { genrateRandomNumber } from '../../utils/utils';
import { TrainingType, TrainingTime, LevelTraining, TRAINING_ARR, TRAINING_TIME, LEVEL_TRAIN_ARR } from '../../types/training';

enum FormFieldName {
  title = 'title',
  levelTraining = 'levelTraining',
  trainingType = 'trainingType',
  trainingTime = 'trainingTime',
  price = 'price',
  caloriesReset = 'caloriesReset',
  description = 'description',
  gender = 'gender',
  video = 'video'
}

export default function CreateTrainingPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoadingPost = useAppSelector(getIsLoadingPostTraining);
  const hasErrorPost = useAppSelector(getErrorPost);
  const ARIA_BUTTONS_STATE = { trType: false, trTime: false, levelTr: false };
  const [isOpened, setIsOpened] = useState(ARIA_BUTTONS_STATE);
  const ARIA_LIST_BOX = { trType: TrainingType.Aerobics, trTime: TrainingTime.Time30, levelTr: LevelTraining.Beginner };
  const [currentAria, setAria] = useState(ARIA_LIST_BOX);
  const [currentGender, setGender] = useState(Gender.None);
  const [fileVideoTraining, setfileVideoTraining] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [description, setdescription] = useState<string>('');
  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const randImg = genrateRandomNumber();
    const data = {
      title: String(formData.get(FormFieldName.title)),
      levelTraining: currentAria.levelTr,
      trainingType: currentAria.trType,
      trainingTime: currentAria.trTime,
      gender: currentGender,
      price: Number(formData.get(FormFieldName.price)),
      caloriesReset: Number(formData.get(FormFieldName.caloriesReset)),
      description: String(formData.get(FormFieldName.description)),
      video: String(fileVideoTraining),
      fileVideoTraining: fileVideoTraining,
      isSpecial: false,
      photo: `img/content/thumbnails/training-${randImg}.jpg`
    };
    dispatch(postTraining(data));
  };


  const handleToggleButtonClick = (nameAria: string) => {
    if (nameAria === 'trType' || nameAria === 'trTime' || nameAria === 'levelTr') {
      setIsOpened({ ...isOpened, [nameAria]: !isOpened[nameAria] });
    }
  };


  const handleAriaChange = (evt: React.MouseEvent<HTMLLIElement>, nameAria: string) => {
    setIsOpened({ ...isOpened, [nameAria]: false });
    if (nameAria === 'trType') { setAria({ ...currentAria, trType: evt.currentTarget.innerText as TrainingType }); }
    if (nameAria === 'trTime') { setAria({ ...currentAria, trTime: evt.currentTarget.innerText as TrainingTime }); }
    if (nameAria === 'levelTr') { setAria({ ...currentAria, levelTr: evt.currentTarget.innerText as LevelTraining }); }
    evt.currentTarget.setAttribute('aria-selected', 'true');
  };


  const handleGenderChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setGender(value as Gender);
    evt.target.setAttribute('checked', 'true');
  };

  const handleVideoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setfileVideoTraining(evt.target.files[0]);
  };

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setdescription(value);
  };

  useEffect(() => {
    if (
      description && (description.length < DescriptionLn.MinLength
        || description.length > DescriptionLn.MaxLength)
    ) {
      setSignCorrectLength(true);
    }
    else {
      setSignCorrectLength(false);
    }
  }, [description]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form
                  method="get"
                  onSubmit={handleFormSubmit}
                >
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Название тренировки</h2>
                        <div className="custom-input create-training__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="text"
                                name={FormFieldName.title}
                                required
                                minLength={MIN_TITLE_LENGTH}
                                maxLength={MAX_TITLE_LENGTH}
                              />
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Характеристики тренировки</h2>
                        <div className="create-training__info">
                          <div className={`custom-select ${isOpened.trType ? 'is-open' : 'custom-select--not-selected'}`}>
                            <span className="custom-select__label">Выберите тип тренировки</span>
                            <div className="custom-select__placeholder">{currentAria.trType}</div>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={() => handleToggleButtonClick('trType')}
                            >
                              <span className="custom-select__text">{currentAria.trType}</span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {TRAINING_ARR.map((el) =>
                                (
                                  <li
                                    key={el}
                                    role="option"
                                    tabIndex={0}
                                    className="custom-select__item"
                                    aria-selected={currentAria.trType === el}
                                    onClick={(evt) => handleAriaChange(evt, 'trType')}
                                  >
                                    {el}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label><span className="custom-input__label">Сколько калорий потратим</span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name={FormFieldName.caloriesReset}
                                  required
                                  min="1000"
                                  max="5000"
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                          <div className={`custom-select ${isOpened.trTime ? 'is-open' : 'custom-select--not-selected'}`}>
                            <span className="custom-select__label">Сколько времени потратим</span>
                            <div className="custom-select__placeholder">{currentAria.trTime}</div>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={() => handleToggleButtonClick('trTime')}
                            >
                              <span className="custom-select__text">{currentAria.trTime}</span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {TRAINING_TIME.map((el) =>
                                (
                                  <li
                                    key={el}
                                    role="option"
                                    tabIndex={0}
                                    className="custom-select__item"
                                    aria-selected={currentAria.trTime === el}
                                    onClick={(evt) => handleAriaChange(evt, 'trTime')}
                                  >
                                    {el}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label><span className="custom-input__label">Стоимость тренировки</span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name={FormFieldName.price}
                                  required
                                  min="0"
                                />
                                <span className="custom-input__text">₽</span>
                              </span>
                            </label>
                          </div>
                          <div className={`custom-select ${isOpened.levelTr ? 'is-open' : 'custom-select--not-selected'}`}>
                            <span className="custom-select__label">Выберите уровень тренировки</span>
                            <div className="custom-select__placeholder">{currentAria.levelTr}</div>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={() => handleToggleButtonClick('levelTr')}
                            >
                              <span className="custom-select__text">{currentAria.levelTr}</span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {LEVEL_TRAIN_ARR.map((el) =>
                                (
                                  <li
                                    key={el}
                                    role="option"
                                    tabIndex={0}
                                    className="custom-select__item"
                                    aria-selected={currentAria.levelTr === el}
                                    onClick={(evt) => handleAriaChange(evt, 'levelTr')}
                                  >
                                    {el}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="create-training__radio-wrapper"><span className="create-training__label">Кому подойдет тренировка</span>
                            <br />
                            <div className="custom-toggle-radio create-training__radio">
                              {USER_GENDER_ARR.map((el) => (
                                <div className="custom-toggle-radio__block" key={el}>
                                  <label htmlFor={el}>
                                    {el === Gender.Male ?
                                      (
                                        <input
                                          type="radio"
                                          id={el}
                                          name="gender"
                                          value={el}
                                          required
                                          onChange={handleGenderChange}
                                        />
                                      )
                                      : (
                                        <input
                                          type="radio"
                                          id={el}
                                          name="gender"
                                          value={el}
                                          onChange={handleGenderChange}
                                        />
                                      )}
                                    <span className="custom-toggle-radio__icon"></span>
                                    <span className="custom-toggle-radio__label">{el}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Описание тренировки</h2>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <span className="custom-input--error">
                              <textarea
                                id={FormFieldName.description}
                                name={FormFieldName.description}
                                placeholder=" "
                                onChange={handleDescriptionChange}
                              >
                              </textarea>
                              {isNotCorrectLength &&
                                <span className="custom-textarea__error">Минимальная длина 10 символ. Максимальная длина 140 символов</span>}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>
                              {fileVideoTraining ? fileVideoTraining.name : 'Загрузите сюда файлы формата MOV, AVI или MP4'}
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input
                              type="file"
                              name="import"
                              tabIndex={-1}
                              accept=".mov, .avi, .mp4"
                              ref={inputRef}
                              required
                              onChange={handleVideoUpload}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button className="btn create-training__button" type="submit" disabled={isLoadingPost || hasErrorPost}>
                      {isLoadingPost ? 'Отправка...' : 'Опубликовать'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
