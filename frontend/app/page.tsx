"use client";

import { useState } from "react";
import { analyze_sentiment, summarize } from "./_request";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import DashboardStats from "./components/DashboardStats";

import WordStats from "./components/Stats";
import TextInputComponent from "./components/TextInputComponent";
import Modal from "./components/Modal";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { SentimentAnalysis, SentimentDetails } from "./interfaces";
import { sentimentDetails, statsData } from "./data";

export default function Analysis() {
  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysis>({
    word_count: 32,
    sentence_count: 4,
    avg_word_length: 6,
    fk_grade: 6.7,
    gf_index: 6.53,
    sentence_complexity: 8,
    lexical_diversity: 0.821,
    sentiment: 0.25,
  });

  const [sentimentInitial, setSentimentInitial] = useState<SentimentAnalysis>({
    word_count: 32,
    sentence_count: 4,
    avg_word_length: 6,
    fk_grade: 6.7,
    gf_index: 6.53,
    sentence_complexity: 8,
    lexical_diversity: 0.821,
    sentiment: 0.25,
  });

  const [textValue, setTextValue] = useState(
    "Die Bunnes-Republic Deitschland iss en bissli greesser ass wie es Nochberland Polen. Deitschland hot um 82.5 millyone Eiwuhner. 75 millyone Mensche sinn Deitsche. 7.5 millyone Mensche sinn Auslenner."
  );
  const [summaryValue, setSummaryValue] = useState(
    "Die Bunnes-Republic Deitschland iss en bissli greesser ass wie es Nochberland Polen. Deitschland hot um 82.5 millyone Eiwuhner. 75 millyone Mensche sinn Deitsche. 7.5 millyone Mensche sinn Auslenner."
  );

  const [currentMetric, setCurrentMetric] = useState<
    keyof SentimentAnalysis | null
  >(null);

  const [activeTab, setActiveTab] = useState<"result" | "initial">("result");

  const currentSentiment =
    activeTab === "result" ? sentimentResult : sentimentInitial;

  const analyzeSentiment = async (textValue: string, result: string) => {
    const response_summary = await analyze_sentiment(result);
    const response_original = await analyze_sentiment(textValue);

    setSentimentInitial(response_original);
    setSentimentResult(response_summary);
  };

  const summarizeContent = async () => {
    const response = await summarize(textValue);
    const result = response?.summary;
    setSummaryValue(JSON.stringify(result));

    await analyzeSentiment(textValue, result);
  };

  return (
    <main className="bg-base-300">
      {/* Navbar */}
      <Navbar></Navbar>

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

        {/* Summary Component */}
        <WordStats text={textValue}></WordStats>

        <TextInputComponent
          textValue={textValue}
          setTextValue={setTextValue}
          summaryValue={summaryValue}
        />

        <div className="justify-center">
          <button onClick={summarizeContent} className="btn btn-wide text-xl">
            Zusammenfassen
          </button>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="py-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mt-6">
          ⚡ Analysieren
          <span className="bg-gradient-to-r from-blue-300 to-yellow-300 bg-clip-text text-transparent">
            &nbsp;Sie Ihren Text.
          </span>
        </h1>
        <div className="p-8">
          <p className="text-md md:text-lg">
            Erhalten Sie mit den Sentiment-Score hinter Ihrem Text!
          </p>
        </div>
      </div>

      {/* Stat Data */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/* Sentiment Table */}
      <div className="p-12">
        <div role="tablist" className="tabs tabs-bordered">
          <a
            role="tab"
            className={`tab ${activeTab === "initial" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("initial")}
          >
            Sentiment Initial
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "result" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("result")}
          >
            Sentiment Result
          </a>
        </div>
        <div className="overflow-x-auto flex justify-center pt-6">
          <table className="table w-auto mx-auto shadow-lg">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(currentSentiment).map(([key, value]) => (
                <tr key={key}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">
                          {sentimentDetails[
                            key as keyof SentimentAnalysis
                          ].fullName.toUpperCase()}
                        </div>
                        <div className="text-sm opacity-50">{key}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-bold text-lg">{value}</span>
                  </td>
                  <td>
                    <div className="mt-4 w-12 h-12">
                      <button
                        className="btn btn-ghost btn-xs tooltip"
                        data-tip="details"
                        onClick={() =>
                          setCurrentMetric(key as keyof SentimentAnalysis)
                        }
                      >
                        <InformationCircleIcon className="w-5 h-5" />
                      </button>
                    </div>
                    {currentMetric === key && (
                      <Modal
                        metricName={
                          sentimentDetails[key as keyof SentimentAnalysis]
                            .fullName
                        }
                        metricText={
                          sentimentDetails[key as keyof SentimentAnalysis]
                            .modalContent.text
                        }
                        setCurrentMetric={setCurrentMetric}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer></Footer>
    </main>
  );
}
