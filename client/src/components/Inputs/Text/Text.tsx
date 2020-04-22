import React, { memo } from "react";
import styles from "./Text.sass";

interface ITextProps {
  onChange(text: string): void;
  type: string;
  error?: boolean;
  errorText?: string;
  style?: string;
}

interface IEvent {
  target: ITarget;
}

interface ITarget {
  value: string;
}

const Text = ({
  error,
  errorText,
  type,
  onChange,
  style,
  ...props
}: ITextProps) => (
  <>
    <div className={`${styles.wrapper} ${style}`}>
      <input
        type={type}
        onChange={(event: IEvent) => onChange(event.target.value)}
        {...props}
      />
      {error ? <div>{errorText}</div> : null}
    </div>
  </>
);

export default memo(Text);
