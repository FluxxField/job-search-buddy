import React, { memo } from "react";
import styles from "./Submit.sass";

interface ISubmitProps {
  onClick(event: IEvent): void;
  value: string;
  error: boolean;
  errorText: string;
  style?: string;
}

interface IEvent {
  preventDefault(): void;
}

const Submit = ({
  onClick,
  value,
  error,
  errorText,
  style,
  ...props
}: ISubmitProps) => (
  <>
    <div className={`${styles.wrapper} ${style}`}>
      <input onClick={onClick} type="submit" value={value} {...props} />
      {error ? <div>{errorText}</div> : null}
    </div>
  </>
);

export default memo(Submit);
