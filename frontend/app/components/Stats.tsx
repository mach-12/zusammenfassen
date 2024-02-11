import React, { useState } from "react";

interface WordStatsProps {
  letters: number;
  words: number;
}

const WordStats: React.FC<WordStatsProps> = ({ letters, words }) => {
  const [isVisible, setIsVisible] = useState(false);

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
