'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RiMailLine, RiLockLine, RiGoogleFill, RiAppleFill, RiFacebookFill } from 'react-icons/ri';
import BRAND from '@/utils/brandConfig';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call for authentication
    setTimeout(() => {
      // In a real application, this would be a fetch to your auth endpoint
      if (email === 'eldar.mammadov@agrofarm.az' && password === 'Absheron2025') {
        // Successful login - redirect to dashboard
        router.push('/dashboard');
      } else {
        // Failed login
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md space-y-8 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-3 text-gray-600">
          Sign in to your {BRAND.name} account
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <RiMailLine className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="block w-full rounded-md border border-gray-300 py-3 pl-10 focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <RiLockLine className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="block w-full rounded-md border border-gray-300 py-3 pl-10 focus:border-brand-primary focus:outline-none focus:ring-brand-primary sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link 
              href="#" 
              className="font-medium text-brand-primary hover:text-brand-secondary"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-primary px-4 py-3 text-sm font-medium text-white hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            {isLoading ? (
              <svg className="mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <RiGoogleFill className="h-5 w-5 text-[#4285F4]" />
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <RiAppleFill className="h-5 w-5 text-[#000000]" />
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <RiFacebookFill className="h-5 w-5 text-[#1877F2]" />
          </button>
        </div>

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            className="font-medium text-brand-primary hover:text-brand-secondary"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
