import React from 'react';
import { Language } from '../types';

interface Props {
  language: Language;
}

const DeveloperPage: React.FC<Props> = ({ language }) => {
  const isTa = language === 'ta';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-slide-up pb-10">
      
      {/* Header Profile */}
      <div className="relative bg-gradient-to-r from-brand-600 to-teal-800 rounded-2xl p-8 text-white shadow-xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
           <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center text-4xl shadow-lg">
             👨‍💻
           </div>
           <div className="text-center md:text-left">
             <h2 className="text-3xl md:text-4xl font-bold mb-2">Mohammed Faizal M</h2>
             <p className="text-teal-100 text-lg mb-1">{isTa ? 'இளங்கலை வணிகவியல் மாணவர்' : 'B.Com Student (Shift I)'}</p>
             <p className="text-teal-200 text-sm">{isTa ? 'தி நியூ கல்லூரி, சென்னை' : 'The New College, Chennai (Govt. Aided Stream)'}</p>
           </div>
        </div>
      </div>

      {/* Stats / Quick Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-500 hover:shadow-lg transition-all hover:-translate-y-1">
          <h3 className="font-bold text-slate-700 mb-1">{isTa ? 'வயது' : 'Age'}</h3>
          <p className="text-2xl text-brand-600">19</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500 hover:shadow-lg transition-all hover:-translate-y-1">
          <h3 className="font-bold text-slate-700 mb-1">{isTa ? 'இடம்' : 'Location'}</h3>
          <p className="text-lg text-accent-600">{isTa ? 'சென்னை, தமிழ்நாடு' : 'Chennai, Tamil Nadu'}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all hover:-translate-y-1">
          <h3 className="font-bold text-slate-700 mb-1">{isTa ? 'பங்கு' : 'Role'}</h3>
          <p className="text-sm text-blue-600 font-medium">Student Placement Officer (Achievers' Club 25-26)</p>
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">{isTa ? 'அனுபவம்' : 'Experience'}</h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl">💼</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800">HR Virtual Internship</h4>
              <p className="text-slate-500 text-sm">Shine Projects • 3 Months</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-xl">🎨</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800">Graphic Design Virtual Internship</h4>
              <p className="text-slate-500 text-sm">Oasis Infobyte • 1 Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="https://wa.me/916383969289" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 hover:scale-105 transition-all">
          <span>WhatsApp</span>
        </a>
        <a href="mailto:faizalmd10101@gmail.com" className="flex items-center justify-center gap-2 p-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 hover:scale-105 transition-all">
          <span>Email Me</span>
        </a>
        <a href="https://www.linkedin.com/in/mohammed-faizal-m-b3242b311/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition-all">
          <span>LinkedIn</span>
        </a>
      </div>

    </div>
  );
};

export default DeveloperPage;
