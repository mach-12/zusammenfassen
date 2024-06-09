import React, { ChangeEvent, useState } from "react";
import Alert from "../components/Alert";

interface ModalProps {
  metricName: string;
  metricText: string;
  setCurrentMetric: (value: any) => void;
}

const Modal: React.FC<ModalProps> = ({
  metricName,
  metricText,
  setCurrentMetric,
}) => {
  return (
    <dialog open id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{metricName}</h3>
        <p className="py-4">{metricText}</p>
        <div className="modal-action">
          <button className="btn" onClick={() => setCurrentMetric(null)}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
