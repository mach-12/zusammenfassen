"use client";

import { SetStateArray, useState } from "react";
import { analyze_sentiment } from "../_request";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import { SentimentAnalysis } from "../interfaces";

export default function HowItWorks() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [textValue, setTextValue] = useState(
    "Die Bunnes-Republic Deitschland iss en bissli greesser ass wie es Nochberland Polen. Deitschland hot um 82.5 millyone Eiwuhner. 75 millyone Mensche sinn Deitsche. 7.5 millyone Mensche sinn Auslenner."
  );
  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysis>({
    word_count: 32,
    sentence_count: 4,
    avg_word_length: 6,
    fk_grade: 6.7,
    gf_index: 6.53,
    sentence_complexity: 8,
    lexical_diversity: 0.82,
    sentiment: 0.25,
  });

  const handleTyping = (event: {
    target: { value: SetStateArray<string> };
  }) => {
    setTextValue(event.target.value);
  };

  const analyzeSentiment = async () => {
    const response = await analyze_sentiment(textValue);
    const result = response;
    setSentimentResult(result);
  };

  return (
    <main className="bg-base-300">
      <Navbar />

      {alertVisible && <Alert />}

      <div className="py-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mt-6">
          Analysieren
          <span className="bg-gradient-to-r from-blue-300 to-yellow-300 bg-clip-text text-transparent">
            &nbsp;Sie Ihren Text.
          </span>
        </h1>

        <div className="p-8">
          <p className="text-md md:text-lg">
            Erhalten Sie mit einem Klick den Sentiment-Score hinter Ihrem Text!
          </p>
        </div>

        <div className="flex p-3 justify-center">
          <textarea
            placeholder="text"
            className="textarea textarea-bordered textarea-lg text-sm w-full max-w-xs"
            value={textValue}
            onChange={handleTyping}
          ></textarea>
        </div>

        <div className="justify-center">
          <button onClick={analyzeSentiment} className="btn btn-wide text-xl">
            Analysieren
          </button>
        </div>
      </div>
      {/* table2 */}
      <table className="table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {Object.entries(sentimentResult).map(([key, value]) => (
            <tr key={key}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">
                      {key.replace("_", " ").toUpperCase()}
                    </div>
                    <div className="text-sm opacity-50">{key}</div>
                  </div>

                  <div className="w-12 h-12">
                    <button
                      className="btn btn-ghost btn-xs tooltip tooltip-primary"
                      data-tip="primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <span className="text-bold">{value}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        <div className="overflow-x-auto w-full max-w-4xl p-4">
          {Object.entries(sentimentResult).map(([key, value]) => (
            <div className="stats shadow" key={key}>
              <div className="stat">
                <div className="stat-figure text-primary">
                  <div className="tooltip tooltip-primary" data-tip="primary">
                    <button className="btn btn-xs btn-circle btn-ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="stat-title">
                  {key.replace("_", " ").toUpperCase()}
                </div>
                <div className="stat-value text-primary">25.6K</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer></Footer>
    </main>
  );
}
