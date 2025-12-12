import React, { useState } from 'react';
import { User, Language } from '../types';
import { APP_NAME, TRANSLATIONS, LogoIcon } from '../constants';

interface Props {
  onLogin: (user: User) => void;
  language: Language;
  onToggleLanguage: () => void;
}

const Auth: React.FC<Props> = ({ onLogin, language, onToggleLanguage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!email || !password) {
      setError(language === 'en' ? 'Please fill all fields' : 'எல்லா விவரங்களையும் நிரப்பவும்');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('mb_users') || '[]');

    if (isLogin) {
      // Login Logic
      const user = storedUsers.find((u: User) => u.email === email && u.password === password);
      if (user) {
        if (rememberMe) {
          localStorage.setItem('mb_session', user.email);
        }
        onLogin(user);
      } else {
        setError(language === 'en' ? 'Invalid email or password' : 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்');
      }
    } else {
      // Signup Logic
      if (password !== confirmPass) {
        setError(language === 'en' ? "Passwords don't match" : "கடவுச்சொற்கள் பொருந்தவில்லை");
        return;
      }
      
      const exists = storedUsers.find((u: User) => u.email === email);
      if (exists) {
        // Feature: Don't reveal if email exists, but for demo we treat as login
        // But user asked for permanent memory:
        setError(language === 'en' ? 'User already exists. Please login.' : 'பயனர் ஏற்கனவே உள்ளார். உள்நுழையவும்.');
        return;
      }

      const newUser: User = { name, email, password };
      storedUsers.push(newUser);
      localStorage.setItem('mb_users', JSON.stringify(storedUsers));
      
      if (rememberMe) {
        localStorage.setItem('mb_session', email);
      }
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 font-sans">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-slate-900 animate-pulse-slow"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 w-full max-w-md p-2">
         {/* Language Toggle on Auth Screen */}
         <div className="absolute top-0 right-0 -mt-12 mr-2">
            <button 
              onClick={onToggleLanguage}
              className="px-4 py-1 bg-white/10 backdrop-blur text-white rounded-full text-sm hover:bg-white/20 transition"
            >
              {language === 'en' ? 'தமிழ்' : 'English'}
            </button>
         </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01]">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 text-brand-400 mb-4 animate-bounce">
              <LogoIcon />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{APP_NAME}</h2>
            <p className="text-brand-200 text-sm mt-1">{t.tagline}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="group">
                 <input
                  type="text"
                  placeholder={language === 'en' ? "Full Name" : "முழு பெயர்"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                />
              </div>
            )}
            
            <div className="group">
              <input
                type="email"
                placeholder={t.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>

            <div className="group">
              <input
                type="password"
                placeholder={t.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>

            {!isLogin && (
              <div className="group animate-fade-in">
                <input
                  type="password"
                  placeholder={t.confirmPassword}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-700 border-slate-500 text-brand-500 focus:ring-brand-500"
              />
              <label htmlFor="remember" className="text-slate-300 text-sm select-none cursor-pointer hover:text-white">{t.rememberMe}</label>
            </div>

            {error && <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-500/30">{error}</div>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-600 to-teal-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-brand-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              {isLogin ? t.login : t.signup}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-slate-400 hover:text-brand-300 text-sm transition-colors"
            >
              {isLogin 
                ? (language === 'en' ? "New here? Create Account" : "புதியவரா? கணக்கை உருவாக்கவும்") 
                : (language === 'en' ? "Already have an account? Login" : "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்")}
            </button>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/10 text-center text-[10px] text-slate-500">
             Note: This is a demo. No data is sent to a server. Accounts are stored in your browser.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
