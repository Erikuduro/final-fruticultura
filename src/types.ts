export type Question = {
  id: number;
  culture: string;
  topic: string;
  text: string;
  answer: 'V' | 'F';
  explanation: string;
};

export type AnswerRecord = {
  questionId: number;
  selectedAnswer: 'V' | 'F';
  isCorrect: boolean;
};
