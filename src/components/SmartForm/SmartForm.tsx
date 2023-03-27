import { ChangeEvent, memo } from 'react';
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
  onChange: (id: string, value: string) => void;
  error?: string;
}

export const SmartForm: React.FC<Props> = memo(
  ({ config, onChange, error }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
      const newValue = e.target.value;
      onChange(id, newValue);
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
  }
);
