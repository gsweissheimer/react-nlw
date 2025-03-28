import React from "react";
import clsx from "clsx";
import style from "./button.module.css";

interface ButtonProps {
  type?: string | null;
  children: React.ReactNode;
  onclick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  submitButton?: boolean;
  className?: string;
  dataEventValue?: string;
}

const buttonTypes: Record<string, string> = {
  primary: `${style.btn} ${style.primaryButton}`,
  secondary: `${style.btn} ${style.secondaryButton}`,
  circle: `${style.btn} ${style.circleButton}`,
  close: style.closeButton,
};

const Button: React.FC<ButtonProps> = ({ type, children, onclick, submitButton = false, className = '', dataEventValue }) => {

  const getClassName = (type?: string | null) => {
    const buttonTypeClass = buttonTypes[type || "primary"];
    
    return clsx(buttonTypeClass, className);
  };

  return (
  <button
    type={submitButton ? 'submit' : 'button'}
    className={getClassName(type)}
    onClick={onclick}
    data-event-value={dataEventValue} >
    {children ?? 'Enviar'}
  </button>
  );
};

export default Button;
