"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { summarize } from "../_request";
import { SetStateAction, useState } from "react";
import Alert from "../components/Alert";
import WordStats from "../components/Stats";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/16/solid";

export default function Home() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [summaryValue, setsummaryValue] = useState(
    "Die Bunnes-Republic Deitschland iss en bissli greesser ass wie es Nochberland Polen. Deitschland hot um 82.5 millyone Eiwuhner. 75 millyone Mensche sinn Deitsche. 7.5 millyone Mensche sinn Auslenner."
  );
  const handleTyping = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTextValue(event.target.value);
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

  const summarizeContent = async () => {
    const response = await summarize(textValue);
    const result = response?.summary;
    setsummaryValue(JSON.stringify(result));
  };

  return (
    <main className="bg-base-300">
      {/* Navbar */}
      <Navbar></Navbar>

      {alertVisible && <Alert />}

      {/* Main */}
      <div className="py-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mt-6">
          ⚡ Geben Sie den Text ein, um ihn &nbsp;
          <span className="bg-gradient-to-r from-blue-300 to-yellow-300 bg-clip-text text-transparent">
            zusammenzufassen
          </span>
          .
        </h1>

        <div className="p-8">
          <p className="text-md md:text-lg">
            Verwenden Sie dieses AI-Tool, um schnelle Einblicke und
            Zusammenfassungen aus Ihrem Text zu erhalten.
          </p>
        </div>

        <WordStats text={textValue}></WordStats>

        {/* <div className="flex p-3 bg-white sm:bg-orange-500 md:bg-yellow-300 lg:bg-green-400 "> */}
        <div className="flex p-3 justify-center">
          <div className="sm:flex md:flex lg:flex xl:flex mx-8 p-5">
            {/* Input Box */}
            <textarea
              placeholder="text"
              className="textarea textarea-bordered textarea-lg text-sm w-full max-w-xs"
              value={textValue}
              onChange={handleTyping}
            ></textarea>
            <div className="divider divider-horizontal"></div>
            {/* Ouput */}
            <div className="p-1 w-full border border-base-300  max-w-xs card bg-base-100 rounded-box relative">
              <button
                id="copyButton"
                className="absolute top-2 right-2 p-1 bg-primary-500 hover:text-yellow-300 text-white rounded-full p- focus:outline-none"
                onClick={handleCopyText}
              >
                <ClipboardDocumentCheckIcon />
              </button>

              <div className="p-6 text-sm">{summaryValue}</div>
            </div>
          </div>
        </div>

        <div className="justify-center">
          <button onClick={summarizeContent} className="btn btn-wide text-xl">
            Zusammenfassen
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </main>
  );
}
