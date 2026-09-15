import { Leaf } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  totalQuestions: number;
}

export function WelcomeScreen({ onStart, totalQuestions }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          Simulado de Fruticultura
        </h1>
        
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          Prepare-se com este banco de {totalQuestions} questões interativas sobre as culturas de Abacaxi, Maracujá, Mamão, Manga e Banana. Teste seus conhecimentos marcando Verdadeiro ou Falso.
        </p>

        <button
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Iniciar Simulado
        </button>
      </div>
    </div>
  );
}
