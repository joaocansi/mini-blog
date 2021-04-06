import React, { TextareaHTMLAttributes } from "react";
import styles from '../styles/components/InputAndTextarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  rules: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Textarea: React.FC<TextareaProps> = ({ name, rules, setContent, ...rest }) => {
  return (
    <div className={styles.inputAndTextareaContainer}>
      <textarea onChange={e => setContent(e.target.value)} name={name} {...rest}></textarea>
      <p>{rules}</p>
    </div>
  )
}

export default Textarea;