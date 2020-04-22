import React, { memo } from "React";
import styles from "./Button.sass";

interface IButton {
  onClick?(event: object): void;
  children?: string | object;
  style?: string;
}

const Button = ({ onClick, children, style, ...props }: IButton) => (
  <>
    <button
      className={`${styles.button} ${style}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  </>
);

export default memo(Button);
