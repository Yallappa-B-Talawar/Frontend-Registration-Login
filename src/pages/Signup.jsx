import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (value.trim().length < 3) {
          error = 'Username must be at least 3 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\+?[0-9\s\-]{7,15}$/.test(value)) {
          error = 'Please enter a valid phone number (7-15 digits)';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError('');

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === 'password' && formData.confirmPassword) {
      if (value !== formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validateAll()) {
      return;
    }

    setIsLoading(true);

    try {
      await api.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      setSuccessMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', { state: { registeredUsername: formData.name } });
      }, 1500);
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen nextjs-bg flex flex-col justify-center items-center px-4 py-12">
      {/* Container Card */}
      <div className="w-full max-w-[440px] bg-white rounded-2xl border border-neutral-200/80 shadow-nextcard p-8 sm:p-10 transition-all">
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
            Create Account
          </h1>
          <p className="text-sm text-neutral-500 mt-1 text-center">
            Create your account to continue
          </p>
        </div>

        {/* Global Error Banner */}
        {serverError && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200/80 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-red-700 leading-relaxed">
              {serverError}
            </p>
          </div>
        )}

        {/* Success Banner */}
        {successMessage && (
          <div className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-emerald-700 leading-relaxed">
              {successMessage}
            </p>
          </div>
        )}

        {/* Registration Form */}
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
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter username"
              disabled={isLoading}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white border ${
                errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-neutral-200 focus:border-black focus:ring-neutral-100'
              } focus:outline-none focus:ring-2 transition-all placeholder:text-neutral-400 disabled:bg-neutral-50`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={isLoading}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white border ${
                errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-neutral-200 focus:border-black focus:ring-neutral-100'
              } focus:outline-none focus:ring-2 transition-all placeholder:text-neutral-400 disabled:bg-neutral-50`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              disabled={isLoading}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white border ${
                errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-neutral-200 focus:border-black focus:ring-neutral-100'
              } focus:outline-none focus:ring-2 transition-all placeholder:text-neutral-400 disabled:bg-neutral-50`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.phone}
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
                placeholder="Create password"
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                disabled={isLoading}
                className={`w-full pl-3.5 pr-10 py-2.5 rounded-lg text-sm bg-white border ${
                  errors.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-neutral-200 focus:border-black focus:ring-neutral-100'
                } focus:outline-none focus:ring-2 transition-all placeholder:text-neutral-400 disabled:bg-neutral-50`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.confirmPassword}
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
                  <span>Signing up...</span>
                </>
              ) : (
                <>
                  <span>SIGN UP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            Already a user?{' '}
            <Link
              to="/login"
              className="font-semibold text-neutral-900 hover:underline inline-flex items-center"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
