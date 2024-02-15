import React, { useState } from "react";

interface WordStatsProps {
  text: string;
}

function countWordsAndLetters(text: string): {
  words: number;
  letters: number;
} {
  const words = text.split(/\s+/).filter((word) => word !== "").length;

  const letters = text.replace(/\s+/g, "").length;

  return { words, letters };
}

const WordStats: React.FC<WordStatsProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  var stats = countWordsAndLetters(text);
  const words = stats.words;
  const letters = stats.letters;

  return (
    <div className="stats shadow text-sm">
      <div className="stat place-items-center">
        <div className="stat-title">Letters</div>
        <div className="stat-value">{letters}</div>
        <div className="stat-desc">Total letters</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Words</div>
        <div className="stat-value">{words}</div>
        <div className="stat-desc">Total words</div>
      </div>
    </div>
  );
};

export default WordStats;
