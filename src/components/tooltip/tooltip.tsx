import React, { ReactNode, useState } from 'react';
import Style from './tooltip.module.css';

interface TooltipProps {
  content?: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
    className={Style.tooltipContainer}
    role="button"
    tabIndex={0}
    aria-pressed={isVisible} // ou aria-expanded se for um menu
    onMouseEnter={() => setIsVisible(true)}
    onMouseLeave={() => setIsVisible(false)}
    onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // evita scroll ao apertar espaço
        setIsVisible((prev) => !prev);
        }
    }}
    onClick={() => setIsVisible((prev) => !prev)} // garante clique e toque
    >
      {children}

      {(isVisible && content) && (
        <div className={Style.tooltipContent}>
          {content}
        </div>
      )}
    </div>
  );
};
