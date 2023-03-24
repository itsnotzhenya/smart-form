import { useCallback, useState } from 'react';
import { SmartForm } from '../SmartForm';
import './styles.css';

interface FieldConfig {
  id: string;
  type: 'inputText' | 'inputEmail' | 'inputPassword';
  label?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}

export const AuthForm = () => {
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);

  const fields: FieldConfig[] = [
    {
      id: 'first_name',
      type: 'inputText',
      defaultValue: 'Ivan',
      placeholder: 'Введите имя',
    },
    {
      id: 'last_name',
      type: 'inputText',
      defaultValue: 'Ivanov',
      placeholder: 'Введите фамилию ',
    },
    {
      id: 'email',
      type: 'inputEmail',
      placeholder: 'Введите адрес эл. почты',
      required: true,
    },
    {
      id: 'password',
      type: 'inputPassword',
      placeholder: 'Введите пароль',
      required: true,
    },
  ];

  const handleChange = (newValues: { [key: string]: string }) => {
    setFieldValues(newValues);

    const isFormValid = fields.every(
      (field) => !field.required || !!newValues[field.id]
    );

    const emailValid = isEmailValid(fieldValues.email);
    setIsSubmitEnabled(isFormValid && emailValid);
  };

  const isEmailValid = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailIsValid(true);
      return true;
    } else {
      setEmailIsValid(false);
      return false;
    }
  };

  const handleSubmit = useCallback(() => {
    console.log('Submitted values:', fieldValues);
    setIsSubmitted(true);
  }, [fieldValues]);

  return (
    <div className="formContainer">
      {isSubmitted ? (
        <>
          <h1 className="emoji">🙋🏻‍♀️</h1>
          <h1 className="title">
            {`С возвращением, ${fieldValues.first_name} ${fieldValues.last_name}!`}
          </h1>
        </>
      ) : (
        <>
          <h1 className="emoji">💁🏻‍♀️</h1>
          <h1 className="title">Авторизация</h1>
          <p className="subtitle">
            Для доступа к личному кабинету вашей комании авторизуйтесь на сайте
          </p>
          <SmartForm
            config={fields}
            onChange={handleChange}
            showEmailError={emailIsValid}
          />
          <button
            onClick={handleSubmit}
            disabled={!isSubmitEnabled}
            className="submit"
            type="submit">
            Войти
          </button>
        </>
      )}
    </div>
  );
};
