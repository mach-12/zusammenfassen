import React, { ChangeEvent, useState } from "react";
import Alert from "../components/Alert";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/16/solid";

interface TextCopyComponentProps {
  textValue: string;
  setTextValue: (value: string) => void;
  summaryValue: string;
}

const TextCopyComponent: React.FC<TextCopyComponentProps> = ({
  textValue,
  setTextValue,
  summaryValue,
}) => {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleTyping = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(summaryValue)
      .then(() => {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="flex p-3 justify-center">
      {alertVisible && <Alert />}

      <div className="sm:flex md:flex lg:flex xl:flex mx-8 p-5">
        {/* Input Box */}
        <textarea
          placeholder="Text eingeben."
          className="textarea textarea-bordered textarea-lg text-sm w-full max-w-xs"
          value={textValue}
          onChange={handleTyping}
        ></textarea>
        <div className="divider divider-horizontal"></div>

        {/* Output */}
        <div className="p-1 w-full border border-base-300 max-w-xs card bg-base-100 rounded-box relative">
          <button
            id="copyButton"
            className="absolute top-2 right-2 p-1 bg-primary-500 hover:text-yellow-300 text-white rounded-full focus:outline-none"
            onClick={handleCopyText}
          >
            <ClipboardDocumentCheckIcon className="w-4 h-4"/>
          </button>

          <div className="p-6 text-sm">{summaryValue}</div>
        </div>
      </div>
    </div>
  );
};

export default TextCopyComponent;
