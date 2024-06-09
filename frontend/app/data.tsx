import {
  BookOpenIcon,
  DocumentTextIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BeakerIcon,
  HeartIcon,
} from "@heroicons/react/16/solid";
import { SentimentDetails } from "./interfaces";

export const sentimentDetails: SentimentDetails = {
  word_count: {
    fullName: "Word Count",
    modalContent: {
      text: "The total number of words in the text. This metric helps gauge the length of the document and is a basic quantitative measure of its content.",
    },
  },
  sentence_count: {
    fullName: "Sentence Count",
    modalContent: {
      text: "The total number of sentences in the text. This helps to understand the structure and complexity of the document, as well as how ideas are divided.",
    },
  },
  avg_word_length: {
    fullName: "Average Word Length",
    modalContent: {
      text: "The average length of the words in the text, calculated as the total number of characters in words divided by the number of words. This metric can indicate the level of vocabulary sophistication.",
    },
  },
  fk_grade: {
    fullName: "Flesch-Kincaid Grade Level",
    modalContent: {
      text: "A readability test that estimates the U.S. school grade level needed to understand the text. It is calculated based on the average number of words per sentence and the average number of syllables per word. A lower score indicates easier readability.",
    },
  },
  gf_index: {
    fullName: "Gunning Fog Index",
    modalContent: {
      text: "Estimates the years of formal education needed to understand the text on the first reading. It considers sentence length and the complexity of words used. A higher index indicates more complex text.",
    },
  },
  sentence_complexity: {
    fullName: "Sentence Complexity",
    modalContent: {
      text: "Measures the average length of sentences or the frequency of complex sentence structures. Higher complexity can indicate more sophisticated information and argument structuring.",
    },
  },
  lexical_diversity: {
    fullName: "Lexical Diversity",
    modalContent: {
      text: "Measures the variety of words used in the text. High lexical diversity indicates a wide range of vocabulary, which can suggest richer language use and greater content depth.",
    },
  },
  sentiment: {
    fullName: "Sentiment Score",
    modalContent: {
      text: "A score or category that summarizes the overall sentiment of the text—positive, negative, or neutral. This is derived from the computational assessment of the emotional tone carried by the words.",
    },
  },
};

export const statsData = [
  {
    title: "Word Count",
    value: "32",
    icon: <BookOpenIcon className="w-8 h-8" />,
    description: "↗︎ 5 (18%) from original",
  },
  {
    title: "Sentence Count",
    value: "4",
    icon: <DocumentTextIcon className="w-8 h-8" />,
    description: "↗︎ 1 (25%) from original",
  },
  {
    title: "Average Word Length",
    value: "6",
    icon: <ChartBarIcon className="w-8 h-8" />,
    description: "No change",
  },
  {
    title: "Flesch-Kincaid Grade",
    value: "6.7",
    icon: <GlobeAltIcon className="w-8 h-8" />,
    description: "↙︎ 0.3 (4%) from original",
  },

  {
    title: "Sentence Complexity",
    value: "8",
    icon: <BeakerIcon className="w-8 h-8" />,
    description: "↗︎ 1 (14%) from original",
  },
  {
    title: "Lexical Diversity",
    value: "0.821",
    icon: <HeartIcon className="w-8 h-8" />,
    description: "↗︎ 0.05 (6%) from original",
  },
];
