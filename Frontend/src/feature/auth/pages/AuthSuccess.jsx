import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCheckLine } from 'react-icons/ri';

/**
 * AuthSuccess.jsx - Premium Redirect Page
 * Style: Snitch Editorial / Nike-Inspired
 */
const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 selection:bg-[#111111] selection:text-white">
      <div className="max-w-[500px] w-full flex flex-col items-center text-center">
        {/* Animated Check Icon */}
        <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#111111] rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <RiCheckLine className="text-white text-[40px] md:text-[48px]" />
        </div>

        {/* Hero Title */}
        <h1 className="font-['Lexend',_sans-serif] text-[40px] md:text-[56px] font-medium leading-[0.9] tracking-[-0.04em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          SUCCESSFULLY<br />AUTHENTICATED
        </h1>

        {/* Subtitle */}
        <p className="font-['Inter',_sans-serif] text-[#707072] text-[13px] md:text-[14px] uppercase tracking-[0.2em] font-bold animate-in fade-in duration-1000 delay-300">
          Redirecting to Catalog
        </p>

        {/* Minimal Progress Line */}
        <div className="mt-12 w-24 h-[2px] bg-[#F5F5F5] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#111111] animate-progress origin-left"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;
