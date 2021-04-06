import React, { InputHTMLAttributes } from "react";
import styles from '../styles/components/InputAndTextarea.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  rules: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({ name, rules, setContent, ...rest }) => {
  return (
    <div className={styles.inputAndTextareaContainer}>
      <input onChange={e => setContent(e.target.value)} name={name} type="text" {...rest} />
      <p>{rules}</p>
    </div>
  )
}

export default Input;