"use client";
import Navbar from "../components/Navbar";

export default function HowItWorks() {
  return (
    <main className="bg-base-300">
      <Navbar />
      <div className="py-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mt-6">
          <span className="bg-gradient-to-r from-blue-300 to-yellow-300 bg-clip-text text-transparent">
            Analysieren
          </span>
          &nbsp;Sie Ihren Text.
        </h1>
      </div>
    </main>
  );
}
