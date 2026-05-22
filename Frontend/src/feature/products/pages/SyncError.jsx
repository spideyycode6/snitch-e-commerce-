import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiErrorWarningLine, RiRefreshLine, RiArrowLeftLine } from 'react-icons/ri';
import { useAuth } from '../../auth/hooks/useAuth';

/**
 * SyncError.jsx - Dedicated Error Page
 * Style: Snitch Editorial
 */
const SyncError = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logoutHandler } = useAuth();
    const { error } = location.state || { error: 'Unknown Error' };

    const handleBackToLogin = () => {
        logoutHandler();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-white text-[#111111] font-['Inter',_sans-serif] selection:bg-[#111111] selection:text-white flex flex-col">
            {/* --- App Bar --- */}
            <header className="h-[64px] bg-white border-b border-[#E5E5E5] flex items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleBackToLogin}
                        className="p-2 -ml-2 hover:bg-[#F5F5F5] rounded-full transition-colors active:scale-90"
                    >
                        <RiArrowLeftLine className="text-[20px]" />
                    </button>
                </div>
                <div 
                    onClick={() => navigate('/')}
                    className="absolute left-1/2 -translate-x-1/2 font-['Lexend',_sans-serif] text-[24px] md:text-[28px] font-bold tracking-[-0.04em] cursor-pointer"
                >
                    SNITCH
                </div>
                <div className="w-[40px]"></div>
            </header>

            <main className="flex-grow flex items-center justify-center px-6">
                <div className="max-w-[500px] w-full flex flex-col items-center text-center">
                    <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#F5F5F5] rounded-full flex items-center justify-center mb-8">
                        <RiErrorWarningLine className="text-[32px] md:text-[40px] text-[#111111]" />
                    </div>

                    <h1 className="font-['Lexend',_sans-serif] text-[40px] md:text-[56px] font-medium leading-[0.9] tracking-[-0.04em] uppercase mb-4">
                        SYNC<br />ERROR
                    </h1>

                    <p className="font-['Inter',_sans-serif] text-[#707072] text-[13px] md:text-[14px] uppercase tracking-[0.2em] font-bold mb-10">
                        {error === 'Forbidden' ? 'Your session has expired or you are not authorized.' : error}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        {error === 'Forbidden' ? (
                            <button 
                                onClick={handleBackToLogin}
                                className="h-[52px] bg-[#111111] text-white px-10 rounded-full text-[13px] font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-all active:scale-[0.98]"
                            >
                                Sign In to Snitch
                            </button>
                        ) : (
                            <button 
                                onClick={() => navigate(-1)}
                                className="h-[52px] bg-[#111111] text-white px-10 rounded-full text-[13px] font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-all active:scale-[0.98]"
                            >
                                <RiRefreshLine className="inline mr-2 text-[18px]" />
                                Retry Connection
                            </button>
                        )}
                        <button 
                            onClick={() => navigate('/')}
                            className="h-[52px] border-2 border-[#111111] px-10 rounded-full text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[#F5F5F5] transition-all active:scale-[0.98]"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-[10px] text-[#9E9EA0] uppercase tracking-widest">
                © 2026 SNITCH Inc. All rights reserved.
            </footer>
        </div>
    );
};

export default SyncError;
