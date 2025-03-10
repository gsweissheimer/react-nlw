import React from "react";
import clsx from "clsx";
import "./button.css";

interface ButtonProps {
    type?: string | null;
    children: React.ReactNode;
    onclick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    submitButton?: boolean;
    className?: string;
    dataEventValue?: string;
}

const buttonTypes: Record<string, string> = {
    primary: "btn primary-button",
    secondary: "btn secondary-button",
    circle: "btn circle-button",
    close: "close-button",
  };

const Button: React.FC<ButtonProps> = ({ type, children, onclick, submitButton = false, className = '',dataEventValue }) => {

    const getClassName = (type?: string | null) =>
        clsx(buttonTypes[type || "primary"] || type);

  return (
    <button
      type={submitButton ? 'submit' : 'button'}
      className={`${getClassName(type)} ${className}`}
      onClick={onclick}
      data-event-value={dataEventValue} >
        {children ?? 'Enviar'}
    </button>
  );
};

export default Button;
