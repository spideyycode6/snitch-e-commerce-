import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCheckLine } from 'react-icons/ri';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-[#F5F5F5] overflow-hidden">
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lexend:wght@600;700;800&display=swap');"}</style>

      <img
        src="https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1800&auto=format&fit=crop"
        alt="Editorial fashion background"
        className="fixed inset-0 h-full w-full object-cover opacity-5 grayscale pointer-events-none"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px] rounded-[24px] bg-white p-8 flex flex-col items-center text-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#111111]">
            <RiCheckLine className="text-white text-[32px] font-semibold" />
          </div>

          <h1 className="mt-6 text-[32px] font-extrabold uppercase tracking-tighter font-['Lexend',_sans-serif] text-[#111111]">
            AUTHENTICATED
          </h1>

          <p className="mt-4 text-[14px] font-['Inter',_sans-serif] text-[#707072] leading-6">
            You&apos;re being redirected to the app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;
