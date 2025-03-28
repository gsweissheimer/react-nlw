import React from "react";
import style from "./modal.module.css";
import Button from "components/button/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <Button type='close' onclick={onClose} className='white'>
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
