import { ChangeEvent, useState } from 'react';
import './styles.css';

export interface FieldConfig {
  id: string;
  type: 'inputText' | 'inputEmail' | 'inputPassword';
  label?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}

interface Props {
  config: FieldConfig[];
  onChange: (values: { [key: string]: string }) => void;
  error?: string;
}

export const SmartForm: React.FC<Props> = ({
  config,
  onChange,
  error,
}: Props) => {
  const [formValue, setFormValue] = useState<{ [key: string]: string }>(() => {
    const initialValues = config.reduce((acc, field) => {
      if (field.defaultValue) {
        acc[field.id] = field.defaultValue;
      }
      return acc;
    }, {} as { [key: string]: string });
    return initialValues;
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const newValues = { ...formValue, [id]: e.target.value };
    setFormValue(newValues);
    onChange(newValues);
  };

  const renderField = (field: FieldConfig) => {
    const { id, type, label, placeholder, defaultValue, required } = field;

    const inputType = (type: 'inputText' | 'inputEmail' | 'inputPassword') =>
      type === 'inputText'
        ? 'text'
        : type === 'inputEmail'
        ? 'email'
        : 'password';

    return (
      <div key={id} className="wrapper">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          className="input"
          type={inputType(type)}
          defaultValue={defaultValue}
          placeholder={placeholder || ''}
          required={required}
          onChange={(e) => handleChange(e, id)}
        />
        {error && field.id === 'email' && <p className="error">{error}</p>}
      </div>
    );
  };

  return <form>{config.map(renderField)}</form>;
};
