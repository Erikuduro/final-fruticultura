import { Trophy, Home, AlertCircle, RefreshCw } from 'lucide-react';
import { AnswerRecord } from '../types';

interface ResultScreenProps {
  records: AnswerRecord[];
  onRestart: () => void;
  onRetryWrong: () => void;
}

export function ResultScreen({ records, onRestart, onRetryWrong }: ResultScreenProps) {
  const total = records.length;
  const wrongRecords = records.filter((r) => !r.isCorrect);
  const correct = total - wrongRecords.length;
  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 text-center">
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

        {wrongRecords.length > 0 && (
          <div className="text-left mt-8 mb-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <AlertCircle className="w-6 h-6 text-rose-500" />
              Revisão de Erros
            </h3>
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4">
              {wrongRecords.map((record, i) => (
                <div key={i} className="bg-rose-50/50 border border-rose-100 rounded-xl p-5">
                  <div className="flex gap-2 items-center mb-3">
                    <span className="px-2.5 py-1 bg-white border border-rose-200 text-rose-700 rounded-md text-xs font-bold uppercase tracking-wider">
                      {record.question.culture}
                    </span>
                  </div>
                  <p className="font-medium text-slate-800 mb-4 leading-relaxed">{record.question.text}</p>
                  
                  <div className="text-sm mb-4 bg-white/60 p-3 rounded-lg flex flex-wrap gap-x-6 gap-y-2">
                    <div>
                      <span className="text-slate-500 mr-2">Sua resposta:</span>
                      <span className="font-semibold text-rose-600 line-through">
                        {record.selectedAnswer === 'V' ? 'Verdadeiro' : 'Falso'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 mr-2">Gabarito:</span>
                      <span className="font-semibold text-emerald-600">
                        {record.question.answer === 'V' ? 'Verdadeiro' : 'Falso'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-700 bg-white p-4 rounded-lg border border-rose-100 leading-relaxed shadow-sm">
                    <strong className="text-slate-900 block mb-1">Por que?</strong> 
                    {record.question.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          {wrongRecords.length > 0 && (
            <button
              onClick={onRetryWrong}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium text-lg transition-colors flex-1 shadow-sm"
            >
              <RefreshCw className="w-5 h-5" />
              Refazer as que Errou
            </button>
          )}
          <button
            onClick={onRestart}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-lg transition-colors shadow-sm ${
              wrongRecords.length > 0 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 flex-1' 
                : 'bg-slate-900 hover:bg-slate-800 text-white w-full'
            }`}
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
