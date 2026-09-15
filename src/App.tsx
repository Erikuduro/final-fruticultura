/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { questions } from './data';
import { AnswerRecord } from './types';
import { AnimatePresence, motion } from 'motion/react';

type AppState = 'welcome' | 'playing' | 'result';

export default function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  
  // Quiz active state
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'V' | 'F' | null>(null);

  const handleStart = () => {
    setAppState('playing');
    setCurrentIndex(0);
    setRecords([]);
    setHasAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: 'V' | 'F') => {
    if (hasAnswered) return;
    const isCorrect = answer === questions[currentIndex].answer;
    setSelectedAnswer(answer);
    setHasAnswered(true);
    setRecords((prev) => [
      ...prev,
      {
        questionId: questions[currentIndex].id,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setHasAnswered(false);
      setSelectedAnswer(null);
    } else {
      setAppState('result');
    }
  };

  return (
    <div className="font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomeScreen onStart={handleStart} totalQuestions={questions.length} />
          </motion.div>
        )}
        
        {appState === 'playing' && (
          <motion.div
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuizScreen
              question={questions[currentIndex]}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              hasAnswered={hasAnswered}
              selectedAnswer={selectedAnswer}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </motion.div>
        )}

        {appState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <ResultScreen records={records} onRestart={handleStart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
