import { ConversionStep } from '../types/conversion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ConversionStepsProps {
  steps: ConversionStep[];
  isExpanded: boolean;
  onToggle: () => void;
}

export const ConversionSteps = ({ steps, isExpanded, onToggle }: ConversionStepsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">#</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Conversion Steps</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Step
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Scanned
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Stack
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Postfix
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {steps.map((step, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-mono font-bold text-sm shadow-sm">
                        {step.scannedChar}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {step.stack.length > 0 ? (
                          step.stack.map((item, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white font-mono font-bold text-sm shadow-sm"
                            >
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 italic text-sm">empty</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono font-semibold text-emerald-700 text-base">
                        {step.postfix || <span className="text-gray-400 italic text-sm">empty</span>}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {step.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
