import clsx from "clsx";
import style from "./text.module.css";

type TextProps = {
  type: "primary" | "secondary" | "headline" | 'legend' | 'badge' | 'warning' | 'reminder';
  children: React.ReactNode;
  className?: string;
};

const Text = ({ type = "primary", children, className }: TextProps) => {

  const getClassName = (type?: string | null) => clsx(style.text, style[type || "primary"], className);
       
  return (
    <p className={getClassName(type)}>
      {type === "headline" ? <span>{children}</span> : children}
    </p>
  );
};

export default Text;
