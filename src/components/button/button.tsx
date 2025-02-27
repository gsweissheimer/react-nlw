import React from "react";
import clsx from "clsx";
import "./button.css";

interface ButtonProps {
    type?: string | null;
    children: React.ReactNode;
    onclick?: () => void;
    submitButton?: boolean;
}

const buttonTypes: Record<string, string> = {
    primary: "btn primary-button",
    secondary: "btn secondary-button",
    circle: "btn circle-button",
    close: "close-button",
  };

const Button: React.FC<ButtonProps> = ({ type, children, onclick, submitButton = false }) => {

    const getClassName = (type?: string | null) =>
        clsx(buttonTypes[type || "primary"] || type);

  return (
    <button
      type={submitButton ? 'submit' : 'button'}
      className={getClassName(type)}
      onClick={onclick} >
        {children ?? 'Enviar'}
    </button>
  );
};

export default Button;
