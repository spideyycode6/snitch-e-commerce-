import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { registerHandler } = useAuth();
  const { user, error, loading } = useSelector((state) => state.auth || {});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    role: 'buyer',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contact') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerHandler(formData);
    if (data?.success) {
      navigate('/');
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-[#FFFFFF] overflow-y-auto md:overflow-hidden">
      {/* Left panel (desktop/tablet) */}
      <div className="hidden md:block md:w-[40%] lg:w-1/2 md:h-full relative overflow-hidden bg-[#111111] shrink-0">
        {/* Full-bleed editorial campaign image */}
        <img
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop"
          alt="Campaign"
          className="w-full h-full object-cover object-[top]  opacity-60 "
        />
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8 lg:p-12">
          <h1 className="text-white font-['Nike_Futura_ND',_'Futura',_sans-serif] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-widest uppercase text-center leading-tight">
            YOUR STYLE.<br className="hidden md:block" /> YOUR RULES.
          </h1>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full md:w-[60%] lg:w-1/2 flex flex-col md:flex-row md:items-center justify-center p-0 md:p-4 lg:p-6 bg-[#FFFFFF] h-full">

        {/* Mobile cinematic banner */}
        <div className="w-full h-48 relative overflow-hidden bg-[#111111] shrink-0 md:hidden">
          <img
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop"
            alt="Campaign"
            className="w-full h-full object-cover object-[top] opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h1 className="text-white font-['Nike_Futura_ND',_'Futura',_sans-serif] text-2xl text-center font-black tracking-widest uppercase text-center leading-tight">
              YOUR STYLE.<br /> YOUR RULES.
            </h1>
          </div>
        </div>

        <div className="w-full max-w-sm lg:max-w-md flex flex-col gap-1 md:gap-2 px-6 py-8 md:px-8 md:py-10 lg:p-0 mx-auto">

          <div className="mb-1 md:mb-2 text-center md:text-left">
            <h2 className="font-['Nike_Futura_ND',_'Futura',_sans-serif] text-[#111111] text-3xl md:text-4xl lg:text-2xl font-black tracking-widest uppercase mb-0">
              JOIN SNITCH
            </h2>
            <p className="font-['Inter',_sans-serif] text-gray-500 text-xs">
              Create your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">

            <div className="flex flex-col lg:flex-row gap-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full lg:w-1/2 bg-[#F5F5F5] rounded-full px-4 h-10 md:h-11 text-xs md:text-sm border border-transparent focus:border-[#111111] focus:outline-none font-['Inter',_sans-serif] transition-colors"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full lg:w-1/2 bg-[#F5F5F5] rounded-full px-4 h-10 md:h-11 text-xs md:text-sm border border-transparent focus:border-[#111111] focus:outline-none font-['Inter',_sans-serif] transition-colors"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#F5F5F5] rounded-full px-4 h-10 md:h-11 text-xs md:text-sm border border-transparent focus:border-[#111111] focus:outline-none font-['Inter',_sans-serif] transition-colors"
            />

            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#F5F5F5] rounded-full px-4 pr-11 h-10 md:h-11 text-xs md:text-sm border border-transparent focus:border-[#111111] focus:outline-none font-['Inter',_sans-serif] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <RiEyeOffLine className="h-4 w-4" /> : <RiEyeLine className="h-4 w-4" />}
              </button>
            </div>

            <input
              type="tel"
              name="contact"
              placeholder="10-digit Mobile Number"
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full bg-[#F5F5F5] rounded-full px-4 h-10 md:h-11 text-xs md:text-sm border border-transparent focus:border-[#111111] focus:outline-none font-['Inter',_sans-serif] transition-colors"
            />

            {error && (
              <p className="font-['Inter',_sans-serif] text-xs text-red-500 text-center mt-0.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] text-white rounded-full h-10 md:h-11 mt-1 font-['Inter',_sans-serif] text-xs md:text-sm font-bold uppercase tracking-wider disabled:opacity-70 transition-opacity cursor-pointer"
            >
              {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="flex items-center my-1 md:my-2">
            <hr className="flex-1 border-t border-gray-200" />
            <span className="px-2 md:px-3 font-['Inter',_sans-serif] text-[10px] md:text-xs text-gray-400">OR</span>
            <hr className="flex-1 border-t border-gray-200" />
          </div>

          <a
            href="http://localhost:3000/api/auth/google"
            className="flex items-center justify-center gap-2 w-full border border-[#111111] bg-white rounded-full h-10 md:h-11 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="md:w-4 md:h-4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="font-['Inter',_sans-serif] font-semibold text-[#111111] text-[10px] md:text-xs">CONTINUE WITH GOOGLE</span>
          </a>

          <div className="text-center mt-1 md:mt-2">
            <span className="font-['Inter',_sans-serif] text-xs text-gray-500">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="cursor-pointer font-bold text-[#111111] hover:underline"
              >
                SIGN IN
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;