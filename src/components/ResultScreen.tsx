import { Trophy, RotateCcw } from 'lucide-react';
import { AnswerRecord } from '../types';

interface ResultScreenProps {
  records: AnswerRecord[];
  onRestart: () => void;
}

export function ResultScreen({ records, onRestart }: ResultScreenProps) {
  const total = records.length;
  const correct = records.filter((r) => r.isCorrect).length;
  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Trophy className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Simulado Concluído!
        </h1>
        
        <p className="text-slate-500 mb-8 font-medium">
          Aqui está o seu resultado final
        </p>

        <div className="bg-slate-50 rounded-2xl p-8 mb-8 border border-slate-100">
          <div className="text-6xl font-bold text-slate-900 mb-2 tracking-tighter">
            {correct} <span className="text-3xl text-slate-400">/ {total}</span>
          </div>
          <div className="text-lg font-medium text-slate-500 mb-4">
            Questões corretas
          </div>
          
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
            <div 
              className={`h-full ${percentage >= 70 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-sm font-bold text-slate-700">
            {percentage}% de aproveitamento
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          <RotateCcw className="w-5 h-5" />
          Refazer Simulado
        </button>
      </div>
    </div>
  );
}
