import { Leaf } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Question } from '../types';

interface WelcomeScreenProps {
  onStart: (filteredQuestions: Question[]) => void;
  allQuestions: Question[];
}

export function WelcomeScreen({ onStart, allQuestions }: WelcomeScreenProps) {
  const cultures = useMemo(() => {
    // Map cultures and replace "Geral" with "Todas as Culturas" to avoid confusion, 
    // or just let it be. Let's filter unique ones.
    const set = new Set(allQuestions.map(q => q.culture));
    return ['Todas', ...Array.from(set)];
  }, [allQuestions]);

  const [selectedCulture, setSelectedCulture] = useState<string>('Todas');

  const handleStart = () => {
    if (selectedCulture === 'Todas') {
      onStart(allQuestions);
    } else {
      onStart(allQuestions.filter(q => q.culture === selectedCulture));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          Simulado de Fruticultura
        </h1>
        
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          Prepare-se com nosso banco de {allQuestions.length} questões. Escolha o tema que deseja estudar ou simule a prova completa.
        </p>

        <div className="mb-10">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Escolha o Tema</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {cultures.map(culture => (
              <button
                key={culture}
                onClick={() => setSelectedCulture(culture)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedCulture === culture
                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500 shadow-sm'
                    : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300'
                }`}
              >
                {culture}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full sm:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Iniciar Simulado
        </button>
      </div>
    </div>
  );
}
