// src/Modal.js
import React, { useEffect } from "react";

const ImageModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === "modal-overlay") {
        onClose();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed z-40 inset-0 overflow-y-scroll pt-5 flex justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white h-[55rem] rounded-lg shadow-lg max-w-[100rem] w-full pb-20">
        {children}
      </div>
    </div>
  );
};

export default ImageModal;
