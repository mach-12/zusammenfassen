"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { SetStateAction, useRef, useState } from "react";
import Alert from "../components/Alert";

export default function Home() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [summaryValue, setsummaryValue] = useState(
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, voluptates provident quasi sunt eveniet aliquid, cupiditate  magni quidem reiciendis pariatur eligendi? Hic similique labore  dolore consequatur culpa. Reiciendis, error quisquam."
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

  return (
    <main className="bg-base-300">
      {/* Navbar */}
      <Navbar></Navbar>

      {alertVisible && <Alert />}

      {/* Main */}
      <div className=" py-6 text-center">
        <h1 className="text-xl font-bold">⚡ How it works</h1>


        <div className="justify-center">
          <button className="btn btn-wide">Zusammenfassen</button>
        </div>
      </div>

      {/* Footer */}

      <Footer></Footer>
    </main>
  );
}
