import clsx from "clsx";
import style from "./highlightText.module.css";

type HighlightTextProps = {
  type: "primary" | "secondary" | "headline";
  children: React.ReactNode;
  className?: string;
  color?: string;
};

const tagMap = {
  primary: "h1",
  secondary: "h2",
  headline: "p",
} as const;

const HighlightText = ({ type = "primary", children, className, color }: HighlightTextProps) => {
  const Tag = tagMap[type];

  const getClassName = (type?: string | null) => clsx(style["highlight-text"], style[type || ""], className);
          

  return (
    <Tag className={getClassName(type)} style={{ color: color ?? 'inherit' }}>
      {type === "headline" ? <span>{children}</span> : children}
    </Tag>
  );
};

export default HighlightText;
