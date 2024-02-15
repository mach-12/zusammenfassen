"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { SetStateAction, useRef, useState } from "react";
import Alert from "../components/Alert";

export default function HowItWorks() {


  return (
    <main className="bg-base-300">
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Main */}
      <div className=" py-6 text-center">
        <h1 className="text-xl font-bold">⚡ How it works</h1>

        <div className="justify-center">Hi </div>
      </div>

      {/* Footer */}

      <Footer></Footer>
    </main>
  );
}
