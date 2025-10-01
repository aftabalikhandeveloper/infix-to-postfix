import { useState } from 'react';
import { ArrowRight, Calculator, AlertCircle, Sparkles, Github, BookOpen } from 'lucide-react';
import { infixToPostfix, validateInfixExpression } from './utils/infixToPostfix';
import { ConversionSteps } from './components/ConversionSteps';
import { ConversionResult } from './types/conversion';

function App() {
  const [infixExpression, setInfixExpression] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);

  const examples = [
    'A+B*C',
    '(A+B)*C',
    'A+B*C-D/E',
    '(A+B)*(C-D)',
    'A^B^C',
    '((A+B)*C-D)/E',
  ];

  const handleConvert = () => {
    setError(null);
    setResult(null);
    setShowSteps(false);

    const validationError = validateInfixExpression(infixExpression);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const conversionResult = infixToPostfix(infixExpression);
      setResult(conversionResult);
    } catch (err) {
      setError('An error occurred during conversion');
    }
  };

  const handleExampleClick = (example: string) => {
    setInfixExpression(example);
    setError(null);
    setResult(null);
    setShowSteps(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl mb-6 transform hover:scale-110 transition-transform duration-300">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Infix to Postfix Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform infix expressions to postfix notation with detailed step-by-step explanations
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="mb-6">
            <label htmlFor="infix-input" className="block text-sm font-semibold text-gray-700 mb-3">
              Enter Infix Expression
            </label>
            <div className="relative">
              <input
                id="infix-input"
                type="text"
                value={infixExpression}
                onChange={(e) => setInfixExpression(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., A+B*C or (A+B)*C"
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 font-mono"
              />
              <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Supported operators: + - * / % ^ ( )
            </p>
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3 text-lg"
          >
            Convert to Postfix
            <ArrowRight className="w-5 h-5" />
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl">
              <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider mb-3">
                Postfix Expression
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-3xl font-bold text-emerald-900 font-mono tracking-wide">
                  {result.postfix}
                </p>
                <button
                  onClick={() => setShowSteps(!showSteps)}
                  className="ml-auto px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-700 font-semibold rounded-lg shadow-sm border border-emerald-200 hover:border-emerald-300 transition-all duration-200 text-sm"
                >
                  {showSteps ? 'Hide Steps' : 'Show Steps'}
                </button>
              </div>
            </div>
          )}
        </div>

        {result && showSteps && (
          <div className="mb-8">
            <ConversionSteps
              steps={result.steps}
              isExpanded={true}
              onToggle={() => setShowSteps(!showSteps)}
            />
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Try Examples</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl font-mono font-semibold text-gray-800 hover:text-blue-700 transition-all duration-200 hover:shadow-md"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">About Infix & Postfix Notation</h2>
          <div className="space-y-4 text-blue-50 leading-relaxed">
            <p>
              <strong className="text-white">Infix notation</strong> is the standard mathematical notation where operators are placed between operands (e.g., A + B).
            </p>
            <p>
              <strong className="text-white">Postfix notation</strong> (also called Reverse Polish Notation) places operators after their operands (e.g., A B +).
            </p>
            <p>
              Postfix expressions are easier for computers to evaluate as they eliminate the need for parentheses and operator precedence rules.
            </p>
            <div className="mt-6 pt-6 border-t border-blue-400">
              <h3 className="font-semibold text-lg mb-2 text-white">Operator Precedence (High to Low):</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>^ (Exponentiation) - Highest</li>
                <li>*, /, % (Multiplication, Division, Modulo)</li>
                <li>+, - (Addition, Subtraction) - Lowest</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <div className="flex items-center justify-center gap-6 mb-4">
            <a
              href="https://github.com/aftabalikhandeveloper"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>
          <p className="text-sm">
            Built for students and professionals by Aftab Ali Khan
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
