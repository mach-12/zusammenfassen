"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { SetStateAction, useRef, useState } from "react";
import Alert from "./components/Alert";
import WordStats from "./components/Stats";
import { stringify } from "querystring";

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
        }, 2000); // Adjust the timeout as needed
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const summarizeContent = () => {
    const summary = "summarise: " + textValue;
    query({ inputs: textValue }).then((response) => {
      const summary = response[0].generated_text;

      setsummaryValue(JSON.stringify(summary));

      console.log(JSON.stringify(response));
    });
  };

  async function query(data: any) {

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mach-12/t5-small-finetuned-mlsum-de",
      {
        headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result;
  }

  return (
    <main className="bg-base-300">
      {/* Navbar */}
      <Navbar></Navbar>

      {alertVisible && <Alert />}

      {/* Main */}
      <div className=" py-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mt-6">
          ⚡ Geben Sie den Text ein, um ihn
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

            {/* Ouput */}
            <div className="p-1 w-full border border-base-300  max-w-xs card bg-base-100 rounded-box relative">
              <button
                id="copyButton"
                className="absolute top-2 right-2 p-1 bg-primary-500 hover:text-yellow-300 text-white rounded-full p- focus:outline-none"
                onClick={handleCopyText}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />{" "}
                  <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />{" "}
                </svg>
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
