import React, { useState, useEffect, useRef } from 'react';
import { User, AppMode, Language, ChatMessage } from './types';
import { APP_NAME, TRANSLATIONS, LogoIcon } from './constants';
import Auth from './components/Auth';
import IntroAnimation from './components/IntroAnimation';
import TypingCoach from './components/TypingCoach';
import DeveloperPage from './components/DeveloperPage';
import { generateAIResponse } from './services/geminiService';

function App() {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Load (Check localStorage)
  useEffect(() => {
    const storedLang = localStorage.getItem('mb_lang') as Language;
    if (storedLang) setLanguage(storedLang);

    const session = localStorage.getItem('mb_session');
    if (session) {
      const users = JSON.parse(localStorage.getItem('mb_users') || '[]');
      const foundUser = users.find((u: User) => u.email === session);
      if (foundUser) {
        setUser(foundUser);
        setShowIntro(true); // Show intro on auto-login too
      }
    }
    setLoading(false);
  }, []);

  // Language Toggle
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ta' : 'en';
    setLanguage(newLang);
    localStorage.setItem('mb_lang', newLang);
  };

  // Auth Handlers
  const handleLogin = (user: User) => {
    setUser(user);
    setShowIntro(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('mb_session');
    setUser(null);
    setMode(AppMode.DASHBOARD);
    setMessages([]);
  };

  // Chat Handler
  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const aiText = await generateAIResponse([...messages, userMsg], text, mode, language);
    
    const aiMsg: ChatMessage = { role: 'model', text: aiText, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // If loading localstorage
  if (loading) return null;

  // If not logged in
  if (!user) {
    return <Auth onLogin={handleLogin} language={language} onToggleLanguage={toggleLanguage} />;
  }

  // If Intro Animation active
  if (showIntro) {
    return <IntroAnimation userName={user.name} onComplete={() => setShowIntro(false)} />;
  }

  const t = TRANSLATIONS[language];

  // Render Logic
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      
      {/* Sidebar / Mobile Header */}
      <aside className="bg-white md:w-72 border-b md:border-r border-slate-200 flex-shrink-0 z-20 sticky top-0 md:h-screen overflow-y-auto custom-scrollbar">
        <div className="p-4 md:p-6 flex items-center justify-between md:block">
          <div className="flex items-center gap-3 mb-0 md:mb-8 cursor-pointer" onClick={() => setMode(AppMode.DASHBOARD)}>
            <div className="w-10 h-10 md:w-12 md:h-12 text-brand-600">
              <LogoIcon />
            </div>
            <div>
               <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-teal-800">{APP_NAME}</h1>
               <span className="text-xs text-slate-400 font-medium tracking-wider">CAREER AI</span>
            </div>
          </div>
          
          {/* Mobile Menu Toggle (simplified for this structure, mostly icons in nav) */}
          <div className="md:hidden flex gap-3">
             <button onClick={toggleLanguage} className="px-2 py-1 bg-slate-100 rounded text-sm font-bold text-brand-700">
                {language === 'en' ? 'தமிழ்' : 'ENG'}
             </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex flex-col gap-2 px-4 pb-20">
          <ModeButton 
            active={mode === AppMode.CAREER_MENTOR} 
            onClick={() => setMode(AppMode.CAREER_MENTOR)} 
            icon="🎓" 
            label={t.modes.career} 
          />
          <ModeButton 
            active={mode === AppMode.TYPING_COACH} 
            onClick={() => setMode(AppMode.TYPING_COACH)} 
            icon="⌨️" 
            label={t.modes.typing} 
          />
          <ModeButton 
            active={mode === AppMode.TALLY_COACH} 
            onClick={() => setMode(AppMode.TALLY_COACH)} 
            icon="📊" 
            label={t.modes.tally} 
          />
          <ModeButton 
            active={mode === AppMode.INTERVIEW_SIM} 
            onClick={() => setMode(AppMode.INTERVIEW_SIM)} 
            icon="🤝" 
            label={t.modes.interview} 
          />
          <ModeButton 
            active={mode === AppMode.RESUME_GUIDE} 
            onClick={() => setMode(AppMode.RESUME_GUIDE)} 
            icon="📄" 
            label={t.modes.resume} 
          />
          
          <div className="mt-8 pt-4 border-t border-slate-100">
            <ModeButton 
              active={mode === AppMode.DEVELOPER} 
              onClick={() => setMode(AppMode.DEVELOPER)} 
              icon="👨‍💻" 
              label={t.modes.developer} 
            />
          </div>
        </nav>
        
        {/* Mobile Horizontal Nav */}
        <div className="md:hidden flex overflow-x-auto gap-2 p-2 bg-white border-b border-slate-100 scrollbar-hide">
            <MobileNavButton icon="🏠" active={mode === AppMode.DASHBOARD} onClick={() => setMode(AppMode.DASHBOARD)} />
            <MobileNavButton icon="🎓" active={mode === AppMode.CAREER_MENTOR} onClick={() => setMode(AppMode.CAREER_MENTOR)} />
            <MobileNavButton icon="⌨️" active={mode === AppMode.TYPING_COACH} onClick={() => setMode(AppMode.TYPING_COACH)} />
            <MobileNavButton icon="📊" active={mode === AppMode.TALLY_COACH} onClick={() => setMode(AppMode.TALLY_COACH)} />
            <MobileNavButton icon="🤝" active={mode === AppMode.INTERVIEW_SIM} onClick={() => setMode(AppMode.INTERVIEW_SIM)} />
            <MobileNavButton icon="📄" active={mode === AppMode.RESUME_GUIDE} onClick={() => setMode(AppMode.RESUME_GUIDE)} />
            <MobileNavButton icon="👨‍💻" active={mode === AppMode.DEVELOPER} onClick={() => setMode(AppMode.DEVELOPER)} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-130px)] md:h-screen relative overflow-hidden">
        
        {/* Top Header (Desktop) */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex justify-between items-center z-10">
          <div className="font-medium text-slate-600 truncate max-w-[200px] md:max-w-none">
             {mode === AppMode.DASHBOARD ? t.welcome : t.modes[getModeKey(mode)]}
          </div>
          <div className="flex items-center gap-4">
             <button onClick={toggleLanguage} className="hidden md:block px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-full text-sm font-semibold transition-colors border border-brand-200">
               {language === 'en' ? 'Switch to தமிழ்' : 'Englishக்கு மாறவும்'}
             </button>
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-500 to-orange-400 text-white flex items-center justify-center font-bold text-sm">
                 {user.name.charAt(0).toUpperCase()}
               </div>
               <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-red-500 transition-colors">
                 {t.logout}
               </button>
             </div>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 relative custom-scrollbar">
          
          {mode === AppMode.DASHBOARD && (
            <div className="max-w-5xl mx-auto animate-fade-in">
              <div className="text-center mb-10 mt-4">
                 <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">{t.welcome}, <span className="text-brand-600">{user.name}</span></h2>
                 <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t.tagline}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <DashboardCard 
                   title={t.modes.career} 
                   icon="🎓" 
                   desc="Get personalized career paths and education advice."
                   onClick={() => setMode(AppMode.CAREER_MENTOR)} 
                 />
                 <DashboardCard 
                   title={t.modes.typing} 
                   icon="⌨️" 
                   desc="Practice typing with real-time feedback and analysis."
                   onClick={() => setMode(AppMode.TYPING_COACH)} 
                 />
                 <DashboardCard 
                   title={t.modes.tally} 
                   icon="📊" 
                   desc="Learn Tally Prime, GST, and Accounting basics."
                   onClick={() => setMode(AppMode.TALLY_COACH)} 
                 />
                 <DashboardCard 
                   title={t.modes.interview} 
                   icon="🤝" 
                   desc="Simulate job interviews with instant AI feedback."
                   onClick={() => setMode(AppMode.INTERVIEW_SIM)} 
                 />
                 <DashboardCard 
                   title={t.modes.resume} 
                   icon="📄" 
                   desc="Optimize your resume for ATS and recruiters."
                   onClick={() => setMode(AppMode.RESUME_GUIDE)} 
                 />
                 <DashboardCard 
                   title={t.modes.developer} 
                   icon="👨‍💻" 
                   desc="Meet the developer behind MentorBridge."
                   onClick={() => setMode(AppMode.DEVELOPER)} 
                   color="bg-slate-800 text-white"
                 />
              </div>

              <footer className="mt-16 text-center text-slate-400 text-sm pb-8">
                 Made with ❤️ by Mohammed Faizal, B.Com student, shift 1, The New College, Chennai.
              </footer>
            </div>
          )}

          {mode === AppMode.DEVELOPER && <DeveloperPage language={language} />}

          {mode === AppMode.TYPING_COACH && (
            <div className="max-w-3xl mx-auto">
              <TypingCoach language={language} onFinish={(stats) => handleSendMessage(stats)} />
              {/* Note: Typing Coach also shows chat below for feedback */}
            </div>
          )}

          {/* Chat Interface (Always visible in non-dashboard modes, or part of the layout) */}
          {mode !== AppMode.DASHBOARD && mode !== AppMode.DEVELOPER && (
             <div className="max-w-4xl mx-auto mt-6 flex flex-col h-[600px] bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar">
                  {messages.length === 0 && (
                    <div className="text-center text-slate-400 mt-10">
                      <p className="text-4xl mb-2">👋</p>
                      <p>{language === 'en' ? "How can I help you today?" : "நான் உங்களுக்கு எப்படி உதவ முடியும்?"}</p>
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-brand-600 text-white rounded-br-none' 
                          : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                      }`}>
                         <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                     <div className="flex justify-start">
                       <div className="bg-white border border-slate-100 rounded-2xl p-4 rounded-bl-none flex gap-2 items-center">
                         <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                         <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                         <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                       </div>
                     </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
                   <input 
                     type="text" 
                     className="flex-1 border border-slate-300 rounded-full px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
                     placeholder={language === 'en' ? "Type your message..." : "உங்கள் செய்தியை இங்கே தட்டச்சு செய்யவும்..."}
                     value={inputText}
                     onChange={(e) => setInputText(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                   />
                   <button 
                     onClick={() => handleSendMessage()}
                     disabled={!inputText.trim() || isTyping}
                     className="bg-brand-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-brand-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                   >
                     ➤
                   </button>
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}

// Helper Components
const ModeButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 group
      ${active 
        ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200' 
        : 'hover:bg-slate-50 text-slate-600 hover:text-brand-600'
      }`}
  >
    <span className={`text-xl group-hover:scale-110 transition-transform ${active ? 'scale-110' : ''}`}>{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const MobileNavButton = ({ icon, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl text-xl transition-all
       ${active ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-50 text-slate-500'}`}
  >
    {icon}
  </button>
);

const DashboardCard = ({ title, icon, desc, onClick, color }: any) => (
  <div 
    onClick={onClick}
    className={`p-6 rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-transparent hover:border-brand-200 bg-white
    ${color ? color : ''}`}
  >
    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">{title}</h3>
    <p className={`text-sm ${color ? 'text-slate-300' : 'text-slate-500'}`}>{desc}</p>
  </div>
);

// Helper to map enum to translation key
function getModeKey(mode: AppMode): string {
  switch(mode) {
    case AppMode.CAREER_MENTOR: return 'career';
    case AppMode.TYPING_COACH: return 'typing';
    case AppMode.TALLY_COACH: return 'tally';
    case AppMode.INTERVIEW_SIM: return 'interview';
    case AppMode.RESUME_GUIDE: return 'resume';
    case AppMode.DEVELOPER: return 'developer';
    default: return 'welcome';
  }
}

export default App;
