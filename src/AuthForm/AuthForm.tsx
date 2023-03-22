import { SmartInput } from '../SmartInput';
import './styles.css';

export const AuthForm = () => {
  return (
    <div className="formContainer">
      <h1 className="emoji">💁🏻‍♀️</h1>
      <h1 className="title">Авторизация</h1>
      <p className="subtitle">
        Для доступа к личному кабинету вашей комании авторизуйтесь на сайте
      </p>
      <SmartInput />
      <SmartInput />
      <button className="submit" type="submit">
        Войти
      </button>
    </div>
  );
};
