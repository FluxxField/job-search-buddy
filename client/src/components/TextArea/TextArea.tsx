import React from "react";
import styles from "./TextArea.sass";

interface ITextAreaProps {
  value: string;
  style?: string;
  onChange: any;
  error: boolean;
  errorText: string;
  props?: any;
}

const TextArea = ({
  value,
  style,
  onChange,
  error,
  errorText,
  ...props
}: ITextAreaProps) => (
  <>
    <div className={`${styles.wrapper} ${style}`}>
      <textarea
        className={styles.text_area}
        value={value}
        onChange={(event: any) => {
          onChange(event.target.value);
        }}
        {...props}
      />
      {error && <div>{errorText}</div>}
    </div>
  </>
);

export default TextArea;
