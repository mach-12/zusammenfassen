export type SentimentAnalysis = {
  word_count: number;
  sentence_count: number;
  avg_word_length: number;
  fk_grade: number;
  gf_index: number;
  sentence_complexity: number;
  lexical_diversity: number;
  sentiment: number;
};
export type SentimentDetails = {
  [key in keyof SentimentAnalysis]: {
    fullName: string;
    modalContent: {
      text: string;
    };
  };
};
