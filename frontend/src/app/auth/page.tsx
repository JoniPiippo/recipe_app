// frontend/src/app/auth/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register(email, password, name);
      }

      if (result.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4">
      <div className="absolute inset-0 z-0 food-pattern opacity-30"></div>

      <div className="max-w-md w-full bg-card-dark rounded-2xl border border-border-color p-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-5xl text-primary">
              lunch_dining
            </span>
            <span className="text-2xl font-bold text-text-main">RecipeShare</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border-color mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
            className={`flex-1 py-3 text-center font-medium transition-all ${
              isLogin
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-dark-secondary hover:text-text-main'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
            className={`flex-1 py-3 text-center font-medium transition-all ${
              !isLogin
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-dark-secondary hover:text-text-main'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-dark border border-border-color text-text-main focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-dark border border-border-color text-text-main focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-surface-dark border border-border-color text-text-main focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-background-dark font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin material-symbols-outlined">progress_activity</span>
                Processing...
              </span>
            ) : isLogin ? (
              'Login'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-text-dark-secondary hover:text-primary transition-colors"
          >
            Continue as guest
          </Link>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 pt-6 border-t border-border-color">
          <p className="text-xs text-text-dark-secondary text-center mb-2">Demo Credentials:</p>
          <div className="bg-surface-dark rounded-lg p-3 space-y-1">
            <p className="text-xs text-text-secondary">Email: demo@recipeshare.com</p>
            <p className="text-xs text-text-secondary">Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}