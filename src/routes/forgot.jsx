import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]); // OTP inputlar uchun ref

  const [step, setStep] = useState('email'); // email | otp | reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // Taymer logikasi
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // 1. KOD GENERATSIYA (Email yuborish o'rniga)
  const handleSendCode = (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    // Simulyatsiya: 1.5 soniya yuklanish
    setTimeout(() => {
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(newOtp);
      
      // DIQQAT: Kodni konsolga chiqaramiz (Email o'rniga)
      console.log(`Tasdiqlash kodi: ${newOtp}`);
      alert(`Test rejimi: Tasdiqlash kodi - ${newOtp}`);

      setIsLoading(false);
      setStep('otp');
      setTimer(60);
    }, 1000);
  };

  // 2. OTP INPUTLARNI BOSHQARISH (Optimallashgan)
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Faqat raqamlar

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Faqat oxirgi raqamni olish
    setOtp(newOtp);

    // Avtomatik keyingi inputga o'tish
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // 3. KODNI TEKSHIRISH
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join('') === generatedCode) {
      setStep('reset');
    } else {
      alert("Kod noto'g'ri!");
    }
  };

  // 4. PAROLNI YANGILASH
  const handleReset = (e) => {
    e.preventDefault();
    if (passwords.new.length < 6) return alert("Parol juda qisqa!");
    if (passwords.new !== passwords.confirm) return alert("Mos kelmadi!");

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Parol yangilandi!");
      navigate('/signin');
    }, 1500);
  };

  // UI Yordamchi komponenti (Inputlar uchun)
  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <form onSubmit={handleSendCode} className="space-y-5">
            <input 
              type="email" required placeholder="Email manzilingiz" 
              className="w-full p-4 bg-slate-800/40 border border-slate-700 rounded-2xl outline-none focus:border-orange-500 transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={isLoading} className="w-full py-4 bg-orange-600 rounded-2xl font-black text-xs tracking-widest hover:bg-orange-500 disabled:opacity-50">
              {isLoading ? "YUBORILMOQDA..." : "KODNI OLISH"}
            </button>
          </form>
        );
      case 'otp':
        return (
          <form onSubmit={handleVerifyOtp} className="space-y-6 text-center">
            <p className="text-slate-400 text-xs italic">{email} ga kod yuborildi</p>
            <div className="flex justify-center gap-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text" maxLength="1"
                  className="w-12 h-14 bg-slate-800/40 border border-slate-700 rounded-xl text-center text-xl font-bold outline-none focus:border-blue-500"
                  value={data}
                  onChange={e => handleOtpChange(e.target.value, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <button className="w-full py-4 bg-blue-600 rounded-2xl font-black text-xs tracking-widest hover:bg-blue-500">
              TASDIQLASH
            </button>
            <button 
                type="button" disabled={timer > 0} onClick={handleSendCode}
                className={`text-[10px] font-bold uppercase ${timer > 0 ? 'text-slate-600' : 'text-blue-400'}`}
            >
                {timer > 0 ? `Qayta yuborish (${timer}s)` : "Kodni qayta yuborish"}
            </button>
          </form>
        );
      case 'reset':
        return (
          <form onSubmit={handleReset} className="space-y-4">
            <input 
              type="password" required placeholder="Yangi parol" 
              className="w-full p-4 bg-slate-800/40 border border-slate-700 rounded-2xl outline-none focus:border-emerald-500"
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
            />
            <input 
              type="password" required placeholder="Parolni tasdiqlang" 
              className="w-full p-4 bg-slate-800/40 border border-slate-700 rounded-2xl outline-none focus:border-emerald-500"
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
            />
            <button className="w-full py-4 bg-emerald-600 rounded-2xl font-black text-xs tracking-widest hover:bg-emerald-500">
              YANGILASH
            </button>
          </form>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] p-4 relative overflow-hidden text-white">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="max-w-[400px] w-full bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-slate-800/50 shadow-2xl p-8 relative z-10">
        <header className="mb-8 text-center">
          <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transition-all duration-500
            ${step === 'email' ? 'bg-orange-500' : step === 'otp' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-widest uppercase italic">
            {step === 'email' ? "Tiklash" : step === 'otp' ? "Tasdiqlash" : "Yangi parol"}
          </h2>
        </header>

        {renderStep()}

        <footer className="mt-8 text-center border-t border-slate-800/50 pt-6">
          <Link to="/signin" className="text-slate-500 hover:text-white text-[10px] font-bold uppercase">
            Bekor qilish
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default ForgotPassword;
