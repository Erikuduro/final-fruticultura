import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { questions } from './data';
import { AnswerRecord, Question } from './types';
import { AnimatePresence, motion } from 'motion/react';

type AppState = 'welcome' | 'playing' | 'result';

export default function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  
  // Quiz active state
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'V' | 'F' | null>(null);

  const handleStart = (selectedQuestions: Question[]) => {
    setActiveQuestions(selectedQuestions);
    setAppState('playing');
    setCurrentIndex(0);
    setRecords([]);
    setHasAnswered(false);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setAppState('welcome');
  };

  const handleRetryWrong = () => {
    const wrongQuestions = records.filter(r => !r.isCorrect).map(r => r.question);
    handleStart(wrongQuestions);
  };

  const handleAnswer = (answer: 'V' | 'F') => {
    if (hasAnswered) return;
    const currentQuestion = activeQuestions[currentIndex];
    const isCorrect = answer === currentQuestion.answer;
    
    setSelectedAnswer(answer);
    setHasAnswered(true);
    setRecords((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setHasAnswered(false);
      setSelectedAnswer(null);
    } else {
      setAppState('result');
    }
  };

  return (
    <div className="font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomeScreen onStart={handleStart} allQuestions={questions} />
          </motion.div>
        )}
        
        {appState === 'playing' && activeQuestions.length > 0 && (
          <motion.div
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuizScreen
              question={activeQuestions[currentIndex]}
              currentIndex={currentIndex}
              totalQuestions={activeQuestions.length}
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
            <ResultScreen 
              records={records} 
              onRestart={handleRestart}
              onRetryWrong={handleRetryWrong}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
