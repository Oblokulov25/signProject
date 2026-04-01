import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      console.log("Kirish ma'lumotlari:", formData);
      // Bu yerda API chaqiruvi bo'ladi
    }
  };

  const canSubmit = formData.email && formData.password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />

      <div className="max-w-[420px] w-full bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-slate-800/50 shadow-2xl p-8 md:p-12 relative z-10">
        
        <header className="mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-indigo-500/20 -rotate-3 hover:rotate-0 transition-transform duration-500">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Xush kelibsiz</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">Davom etish uchun tizimga kiring</p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email manzili</label>
            <input 
              name="email" 
              type="email" 
              required
              onChange={handleChange} 
              placeholder="example@mail.com" 
              className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" 
            />
          </div>

{/* Parol qismi */}
<div className="space-y-1">
  <div className="flex justify-between items-center px-1">
    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
      Parol
    </label>
    
    {/* Eski button o'rniga faqat bitta to'g'ri Link qoldiramiz */}
    <Link 
      to="/forgot" 
      className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider"
    >
      Unutdingizmi?
    </Link>
  </div>

  <div className="relative group">
    <input 
      name="password" 
      type={showPassword ? "text" : "password"}
      required
      onChange={handleChange} 
      placeholder="••••••••" 
      className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" 
    />
    
    {/* Parolni ko'rsatish/yashirish ko'zchasi */}
    <button 
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none"
    >
      {showPassword ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
        </svg>
      )}
    </button>
  </div>
</div>

          {/* Remember Me */}
          <div className="flex items-center px-1">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all cursor-pointer" 
            />
            <label htmlFor="remember" className="ml-2 text-xs font-semibold text-slate-400 cursor-pointer select-none hover:text-slate-300">Meni eslab qol</label>
          </div>

          {/* Submit Button */}
          <button 
            disabled={!canSubmit}
            type="submit"
            className={`w-full py-4 rounded-2xl font-black text-xs tracking-[0.2em] transition-all duration-500 mt-4 overflow-hidden relative group active:scale-95
              ${canSubmit 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/25 hover:bg-indigo-500 hover:-translate-y-1' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
          >
            <span className="relative z-10">TIZIMGA KIRISH</span>
            {canSubmit && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            )}
          </button>
        </form>

        <footer className="mt-10 pt-6 border-t border-slate-800/50 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Hisobingiz yo'qmi? 
            <Link to="/signup" className="text-indigo-400 font-black hover:text-indigo-300 transition-colors ml-2 uppercase tracking-tighter">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SignIn;