import React, { useState, useEffect, useRef } from 'react';
import { TYPING_SENTENCES, TRANSLATIONS } from '../constants';
import { Language, TypingResult } from '../types';

interface Props {
  language: Language;
  onFinish: (stats: string) => void; // Callback to send stats to AI
}

const TypingCoach: React.FC<Props> = ({ language, onFinish }) => {
  const [sentence, setSentence] = useState(TYPING_SENTENCES[0]);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[language].typing;

  const startTest = () => {
    const randomSentence = TYPING_SENTENCES[Math.floor(Math.random() * TYPING_SENTENCES.length)];
    setSentence(randomSentence);
    setInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    setInput(val);

    // Calc stats live
    const correctChars = val.split('').filter((char, i) => char === sentence[i]).length;
    const currentAccuracy = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setAccuracy(currentAccuracy);

    // If completed
    if (val === sentence) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - (startTime || endTime)) / 60000;
      // Standard WPM formula: (Chars / 5) / Minutes. Avoiding divide by zero.
      const timeCalc = timeInMinutes === 0 ? 0.01 : timeInMinutes; 
      const finalWpm = Math.round((sentence.length / 5) / timeCalc);
      
      setWpm(finalWpm);
      setIsFinished(true);
      
      // Save to local storage (simple history)
      const result: TypingResult = { wpm: finalWpm, accuracy: currentAccuracy, date: new Date().toISOString() };
      const history = JSON.parse(localStorage.getItem('mb_typing_history') || '[]');
      history.push(result);
      localStorage.setItem('mb_typing_history', JSON.stringify(history.slice(-5))); // Keep last 5

      // Trigger AI feedback
      onFinish(`I just finished a typing test. WPM: ${finalWpm}, Accuracy: ${currentAccuracy}%. Sentence: "${sentence}".`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-brand-800 mb-4">{language === 'en' ? 'Typing Speed Test' : 'தட்டச்சு வேக சோதனை'}</h3>
      
      {!isFinished ? (
        <>
          <div className="mb-6 p-4 bg-slate-50 rounded-lg text-lg font-medium text-slate-700 leading-relaxed border-l-4 border-brand-500">
            {sentence.split('').map((char, index) => {
              let color = 'text-slate-700';
              if (index < input.length) {
                color = input[index] === char ? 'text-green-600' : 'text-red-500 bg-red-100';
              }
              return <span key={index} className={color}>{char}</span>;
            })}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInput}
            className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-lg"
            placeholder={language === 'en' ? "Type the sentence above..." : "மேலே உள்ள வாக்கியத்தை தட்டச்சு செய்க..."}
          />
          
          <div className="mt-4 text-sm text-slate-500 flex gap-4">
             <span className="font-semibold">{t.accuracy}: {accuracy}%</span>
          </div>
        </>
      ) : (
        <div className="text-center py-8 animate-fade-in">
          <div className="text-4xl font-bold text-brand-600 mb-2">{wpm} <span className="text-base text-slate-500">{t.wpm}</span></div>
          <div className="text-2xl font-semibold text-accent-500 mb-6">{accuracy}% <span className="text-base text-slate-500">{t.accuracy}</span></div>
          <button 
            onClick={startTest}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 hover:scale-105 transition-all transform shadow-md"
          >
            {t.restart}
          </button>
        </div>
      )}

      {/* Helper text if not started */}
      {!startTime && !isFinished && input.length === 0 && (
         <button onClick={startTest} className="mt-4 text-brand-600 underline text-sm hover:text-brand-800">
           {t.start}
         </button>
      )}
    </div>
  );
};

export default TypingCoach;
