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
  color?: string | null;
}

const buttonTypes: Record<string, string> = {
  primary: `${style.btn} ${style.primaryButton}`,
  secondary: `${style.btn} ${style.secondaryButton}`,
  circle: `${style.btn} ${style.circleButton}`,
  circleDark: `${style.btn} ${style.circleButtonDark}`,
  icon: `${style.btn} ${style.icon}`,
  close: style.closeButton,
};

const Button: React.FC<ButtonProps> = ({ type, children, onclick, submitButton = false, className = '', dataEventValue, color = null }) => {

  const getTypeClassName = (type?: string | null) => {
    const buttonTypeClass = buttonTypes[type || "primary"];
  
    return clsx(buttonTypeClass, className);
  };

  return (
  <button
    type={submitButton ? 'submit' : 'button'}
    className={getTypeClassName(type)}
    onClick={onclick}
    data-event-value={dataEventValue}
    style={color ? { backgroundColor: color, color: '#fff' } : undefined}>
    {children ?? 'Enviar'}
  </button>
  );
};

export default Button;
