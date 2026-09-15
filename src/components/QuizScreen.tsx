import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { Check, X, ArrowRight, BookOpen } from 'lucide-react';

interface QuizScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  hasAnswered: boolean;
  selectedAnswer: 'V' | 'F' | null;
  onAnswer: (answer: 'V' | 'F') => void;
  onNext: () => void;
}

export function QuizScreen({
  question,
  currentIndex,
  totalQuestions,
  hasAnswered,
  selectedAnswer,
  onAnswer,
  onNext
}: QuizScreenProps) {
  const isCorrect = selectedAnswer === question.answer;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
            <span>Questão {currentIndex + 1} de {totalQuestions}</span>
            <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
              animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold tracking-wide">
                {question.culture}
              </span>
              <span className="text-slate-400 text-sm font-medium flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {question.topic}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed mb-8">
              {question.text}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => !hasAnswered && onAnswer('V')}
                disabled={hasAnswered}
                className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 text-lg font-medium transition-all ${
                  hasAnswered
                    ? selectedAnswer === 'V'
                      ? question.answer === 'V'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-rose-500 bg-rose-50 text-rose-700'
                      : question.answer === 'V'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 opacity-50'
                        : 'border-slate-100 bg-slate-50 text-slate-400 opacity-50'
                    : 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600'
                }`}
              >
                {hasAnswered && question.answer === 'V' && <Check className="w-5 h-5" />}
                {hasAnswered && selectedAnswer === 'V' && question.answer !== 'V' && <X className="w-5 h-5" />}
                Verdadeiro
              </button>

              <button
                onClick={() => !hasAnswered && onAnswer('F')}
                disabled={hasAnswered}
                className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 text-lg font-medium transition-all ${
                  hasAnswered
                    ? selectedAnswer === 'F'
                      ? question.answer === 'F'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-rose-500 bg-rose-50 text-rose-700'
                      : question.answer === 'F'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 opacity-50'
                        : 'border-slate-100 bg-slate-50 text-slate-400 opacity-50'
                    : 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600'
                }`}
              >
                {hasAnswered && question.answer === 'F' && <Check className="w-5 h-5" />}
                {hasAnswered && selectedAnswer === 'F' && question.answer !== 'F' && <X className="w-5 h-5" />}
                Falso
              </button>
            </div>
          </div>

          {/* Feedback area */}
          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`border-t ${
                  isCorrect ? 'border-emerald-100 bg-emerald-50/50' : 'border-rose-100 bg-rose-50/50'
                } p-8`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 flex items-center gap-2 ${
                      isCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}>
                      {isCorrect ? (
                        <><Check className="w-5 h-5" /> Resposta Correta!</>
                      ) : (
                        <><X className="w-5 h-5" /> Resposta Incorreta</>
                      )}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                  <button
                    onClick={onNext}
                    className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors"
                  >
                    Próxima <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
