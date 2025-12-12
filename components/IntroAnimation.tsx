import React, { useEffect, useState } from 'react';
import { APP_NAME } from '../constants';

interface IntroProps {
  onComplete: () => void;
  userName: string;
}

const IntroAnimation: React.FC<IntroProps> = ({ onComplete, userName }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Timeline of animations
    const t1 = setTimeout(() => setStage(1), 500); // Reveal Line
    const t2 = setTimeout(() => setStage(2), 2000); // Expand
    const t3 = setTimeout(() => setStage(3), 3500); // Welcome Text
    const t4 = setTimeout(() => onComplete(), 5500); // Finish

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-brand-900 flex items-center justify-center overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-slate-900">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-400 via-gray-900 to-black"></div>
      </div>

      <div className="relative z-10 text-center text-white">
        {/* Stage 1 & 2: Line Animation */}
        <div className={`transition-all duration-1000 ease-in-out ${stage >= 1 ? 'w-64 opacity-100' : 'w-0 opacity-0'} h-1 bg-accent-500 mx-auto mb-8`}></div>

        {/* Stage 2: Logo Name */}
        <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter transition-all duration-1000 transform ${stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {APP_NAME}
        </h1>

        {/* Stage 3: Personalized Welcome */}
        <div className={`mt-6 text-2xl md:text-3xl font-light text-teal-200 transition-all duration-1000 transform ${stage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Welcome, {userName}
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
