import React from "react";
import "./modal.css";
import Button from "components/button/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Button type='close' onclick={onClose}>
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
