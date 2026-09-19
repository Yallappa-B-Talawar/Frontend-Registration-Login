import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { Eye, EyeOff, AlertCircle, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: location.state?.registeredUsername || '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [sessionSuccess, setSessionSuccess] = useState(
    location.state?.registeredUsername
      ? 'Registration complete. You can now log in.'
      : ''
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError('');
    setSessionSuccess('');

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // POST /api/login/
      // Backend sets HttpOnly cookie 'token' expiring in 1 hour (3600 seconds)
      // Token is NEVER saved in localStorage or sessionStorage
      await api.login({
        username: formData.username.trim(),
        password: formData.password,
      });

      // Redirect to protected /home route
      navigate('/home');
    } catch (err) {
      setServerError(err.message || 'Invalid username or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen nextjs-bg flex flex-col justify-center items-center px-4 py-12">
      {/* Centered Login Card */}
      <div className="w-full max-w-[400px] bg-white rounded-2xl border border-neutral-200/80 shadow-nextcard p-8 sm:p-10 transition-all">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white mb-4 shadow-sm">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 1155 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-1">
            REGLOG
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Welcome Back
          </h1>
          <p className="text-sm text-neutral-500 mt-1 text-center">
            Login to your account
          </p>
        </div>

        {/* Informational / Success from Signup */}
        {sessionSuccess && (
          <div className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-emerald-700 leading-relaxed">
              {sessionSuccess}
            </p>
          </div>
        )}

        {/* Global Error Banner */}
        {serverError && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200/80 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-red-700 leading-relaxed">
              {serverError}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              disabled={isLoading}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white border ${
                errors.username ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-neutral-200 focus:border-black focus:ring-neutral-100'
              } focus:outline-none focus:ring-2 transition-all placeholder:text-neutral-400 disabled:bg-neutral-50`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                disabled={isLoading}
                className={`w-full pl-3.5 pr-10 py-2.5 rounded-lg text-sm bg-white border ${
                  errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-neutral-200 focus:border-black focus:ring-neutral-100'
                } focus:outline-none focus:ring-2 transition-all placeholder:text-neutral-400 disabled:bg-neutral-50`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-black hover:bg-neutral-800 text-white rounded-lg text-sm font-semibold tracking-wide transition-all duration-150 flex items-center justify-center space-x-2 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>LOGIN</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            New user?{' '}
            <Link
              to="/signup"
              className="font-semibold text-neutral-900 hover:underline inline-flex items-center"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
