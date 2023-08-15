import { useState } from 'react';
import QuestionnaireUserForm from '../questionnaire-user-form/questionnaire-user-form';
import UserRegistrationForm from '../../components/user-registration-form/user-registration-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCreateUserInfo } from '../../store/user-process/selectors';
import { setCreateUserInfo } from '../../store/user-process/user-process';
import { CreateUser, UserRole } from '../../types/user';
import QuestionnaireCoachForm from '../questionnaire-coach-form/questionnaire-coach-form';

export default function RegistrationPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const createUserCurrent = useAppSelector(getCreateUserInfo);

  const [avatarImg, setAvatar] = useState<File>();
  const handleFormSubmit = (createUser: CreateUser, file: File) => {
    dispatch(setCreateUserInfo({createUser}));
    setAvatar(file);
  };

  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        {!createUserCurrent?.email &&
                (<UserRegistrationForm onSubmit={handleFormSubmit} />)}
        {(createUserCurrent?.email && createUserCurrent?.role === UserRole.Coach) &&
                  (<QuestionnaireCoachForm createUser={createUserCurrent} avatarImg={avatarImg}/>) }
        {(createUserCurrent?.email && createUserCurrent?.role === UserRole.User) &&
                  (<QuestionnaireUserForm createUser={createUserCurrent} avatarImg={avatarImg}/>)}
      </main>
    </div>

  );
}

