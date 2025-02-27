import clsx from "clsx";
import "./text.css";

type TextProps = {
  type: "primary" | "secondary" | "headline" | 'legend';
  children: React.ReactNode;
  className?: string;
};

const Text = ({ type = "primary", children, className }: TextProps) => {

  const getClassName = (type?: string | null) => clsx("text", type, className)
       
  return (
    <p className={getClassName(type)}>
      {type === "headline" ? <span>{children}</span> : children}
    </p>
  );
};

export default Text;
