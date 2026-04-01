import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Takrorlanishni kamaytirish uchun yordamchi komponent
const InputField = ({ name, type = "text", placeholder, onChange, onFocus, onBlur, className, error }) => (
  <div className="w-full space-y-1">
    <input
      name={name}
      type={type}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`w-full p-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 ${className}`}
    />
    {error && <p className="text-[10px] text-red-400 ml-2 font-bold uppercase tracking-wider">{error}</p>}
  </div>
);

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  });
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const passwordChecks = useMemo(() => [
    { label: "8+ belgi", met: formData.password.length >= 8 },
    { label: "Katta harf", met: /[A-Z]/.test(formData.password) },
    { label: "Raqam", met: /\d/.test(formData.password) },
    { label: "Belgi (@$!%)", met: /[@$!%*?&]/.test(formData.password) },
  ], [formData.password]);

  const strength = passwordChecks.filter(c => c.met).length;
  const isMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';
  const canSubmit = strength === 4 && isMatch && formData.firstName && formData.email;

  const ui = useMemo(() => {
    if (strength === 0) return { color: "bg-slate-700", text: "Kutilmoqda", width: "5%" };
    if (strength <= 2) return { color: "bg-red-500", text: "Zaif", width: "35%" };
    if (strength === 3) return { color: "bg-amber-500", text: "O'rtacha", width: "65%" };
    return { color: "bg-emerald-500", text: "Mukammal", width: "100%" };
  }, [strength]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />

      <div className="max-w-[450px] w-full bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-slate-800/50 shadow-2xl p-8 md:p-12 relative z-10">
        
        <header className="mb-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-indigo-500/20 rotate-3 transition-transform hover:rotate-0 duration-500">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Ro'yxatdan o'tish</h2>
          <p className="text-slate-400 text-sm mt-2">Xavfsiz va aqlli platformaga xush kelibsiz</p>
        </header>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div className="flex gap-3">
            <InputField name="firstName" placeholder="Ism" onChange={handleChange} />
            <InputField name="lastName" placeholder="Familiya" onChange={handleChange} />
          </div>

          <InputField name="email" type="email" placeholder="Email manzili" onChange={handleChange} />

          <div className="relative group">
            <InputField 
              name="password" 
              type="password" 
              placeholder="Parol" 
              onChange={handleChange} 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {/* Smart Tooltip */}
            <div className={`absolute bottom-[115%] left-0 w-full bg-slate-800 border border-slate-700 shadow-2xl rounded-3xl p-6 transition-all duration-500 origin-bottom z-50
              ${isFocused ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}>
              
              <div className="flex justify-between items-end mb-4 text-[10px] uppercase font-bold tracking-widest">
                <span className="text-slate-500">Daraja: <span className={strength === 4 ? 'text-emerald-400' : 'text-white'}>{ui.text}</span></span>
                <span className="text-white">{strength}/4</span>
              </div>

              <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden mb-5">
                <div 
                  className={`h-full transition-all duration-700 ease-in-out ${ui.color}`} 
                  style={{ width: ui.width }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {passwordChecks.map((check, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-300 ${check.met ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-700/50 text-slate-500'}`}>
                      {check.met ? <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : <div className="w-1 h-1 bg-current rounded-full" />}
                    </div>
                    <span className={`text-[10px] font-bold tracking-tighter ${check.met ? 'text-emerald-400' : 'text-slate-400'}`}>{check.label}</span>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-2 left-10 w-4 h-4 bg-slate-800 border-r border-b border-slate-700 rotate-45" />
            </div>
          </div>

          <InputField 
            name="confirmPassword" 
            type="password" 
            placeholder="Parolni tasdiqlash" 
            onChange={handleChange}
            className={formData.confirmPassword && !isMatch ? 'border-red-500/50' : ''}
            error={formData.confirmPassword && !isMatch ? "Parollar mos emas" : ""}
          />

          <button 
            disabled={!canSubmit}
            className={`w-full py-4 rounded-2xl font-black text-xs tracking-[0.2em] transition-all duration-500 mt-4 overflow-hidden relative group active:scale-[0.98]
              ${canSubmit 
                ? 'bg-indigo-600 text-white shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:-translate-y-1' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
          >
            <span className="relative z-10 uppercase">Hisob yaratish</span>
            {canSubmit && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />}
          </button>
        </form>

        <footer className="mt-8 pt-6 border-t border-slate-800/50 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Profilingiz bormi? <Link to="/signin" className="text-indigo-400 font-black hover:text-indigo-300 transition-colors ml-1 uppercase tracking-tighter">Kirish</Link>
          </p>
        </footer>
      </div>
      
      {/* Tailwind config-ga qo'shish uchun: shimmer animatsiyasi inline style-da yoki global css-da bo'lishi kerak */}
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

export default SignUp;