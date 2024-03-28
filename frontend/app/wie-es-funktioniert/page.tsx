"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import CompanyLogos from "../components/Logos";

const logos = [
  {
    src: "/fastapi-logo.png",
    alt: "FastAPI",
    link: "https://fastapi.tiangolo.com/",
  },
  { src: "/hf-logo.png", alt: "HF Logo", link: "#" },
  { src: "/next-logo.png", alt: "Next.js", link: "https://nextjs.org/" },
  { src: "/spacy-logo.png", alt: "spaCy", link: "https://spacy.io/" },
  {
    src: "/tailwind-css.png",
    alt: "Tailwind CSS",
    link: "https://tailwindcss.com/",
  },
  {
    src: "/tf-logo.png",
    alt: "TensorFlow",
    link: "https://www.tensorflow.org/",
  },
  {
    src: "/azure-logo.png",
    alt: "Microsoft Azure",
    link: "https://azure.microsoft.com/",
  },
];

export default function HowItWorks() {
  return (
    <main className="bg-base-300">
      <Navbar />
      <div className="py-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mt-6 ">
          How it &nbsp;
          <span className="bg-gradient-to-r from-blue-300 to-yellow-300 bg-clip-text text-transparent">
            Works
          </span>
          .
        </h1>

        <div className="p-8">
          <p className="text-md md:text-lg">
            Let&apos;s go over how this tool works
          </p>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mt-6">
          Technologies used
        </h2>

        <CompanyLogos />
      </div>
      <Footer />
    </main>
  );
}
