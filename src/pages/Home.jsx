import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { LogOut, ShieldCheck, User as UserIcon, Clock, Loader2 } from 'lucide-react';

export default function Home({ user }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Username sourced strictly from authenticated backend response
  const username = user?.username || 'User';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // POST /api/logout
      // Revokes DB token and clears HttpOnly cookie (Max-Age=0)
      await api.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen nextjs-bg flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-neutral-200/80 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white shadow-sm">
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 1155 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
              </svg>
            </div>
            <span className="font-bold tracking-tight text-neutral-900 text-lg">
              REGLOG
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-300 hover:bg-neutral-50 text-xs font-semibold tracking-wide transition-all active:scale-[0.99] disabled:opacity-60"
          >
            {isLoggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-neutral-200/80 shadow-nextcard p-8 sm:p-12 text-center transition-all">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-medium mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authenticated Session Active</span>
          </div>

          {/* Welcome Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mb-3">
            Welcome, <span className="text-neutral-950 underline decoration-neutral-300 underline-offset-4">{username}</span>!
          </h1>

          <p className="text-base text-neutral-500 max-w-sm mx-auto mb-8 leading-relaxed">
            You are successfully logged in.
          </p>

          {/* Session Information Card */}
          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 text-left space-y-2.5 mb-8">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-medium flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5 text-neutral-500" />
                Logged in identity:
              </span>
              <span className="font-semibold text-neutral-800">{username}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                Session Storage:
              </span>
              <span className="font-semibold text-neutral-800">Secure HttpOnly Cookie</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Session Expiration:
              </span>
              <span className="font-semibold text-emerald-700">1 Hour</span>
            </div>
          </div>

          {/* Secondary Logout CTA */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full h-11 bg-black hover:bg-neutral-800 text-white rounded-lg text-sm font-semibold tracking-wide transition-all duration-150 flex items-center justify-center space-x-2 active:scale-[0.99] disabled:opacity-60 shadow-sm"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
