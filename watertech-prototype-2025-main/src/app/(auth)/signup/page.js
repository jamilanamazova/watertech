import { redirect } from 'next/navigation';
import SignupWizard from '@/components/auth/SignupWizard';
import Image from 'next/image';
import BRAND from '@/utils/brandConfig';

export default function SignupPage() {
  // We could add server-side auth check here
  // If already authenticated, redirect to dashboard
  // const isAuthenticated = false;
  // if (isAuthenticated) {
  //   redirect('/dashboard');
  // }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Signup wizard */}
      <div className="flex w-full items-center justify-center px-4 py-12 md:w-1/2">
        <SignupWizard />
      </div>

      {/* Right side - Image and branding */}
      <div className="hidden w-1/2 bg-gradient-to-br from-brand-primary to-brand-secondary md:block">
        <div className="flex h-full flex-col items-center justify-center space-y-8 p-8 text-white">
          <div className="mb-8">
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={200}
              height={60}
              className="h-16 w-auto"
            />
          </div>

          <h1 className="mb-2 text-center text-4xl font-bold">{BRAND.tagline}</h1>
          <p className="text-center text-xl">Join the future of smart irrigation</p>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-3 text-3xl">📊</div>
              <h3 className="mb-2 font-semibold">Smart Analytics</h3>
              <p className="text-sm">Track water quality trends and optimize irrigation schedules.</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-3 text-3xl">🚰</div>
              <h3 className="mb-2 font-semibold">Water Insights</h3>
              <p className="text-sm">Get detailed analysis of your water's mineral composition.</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-3 text-3xl">🌱</div>
              <h3 className="mb-2 font-semibold">Crop Recommendations</h3>
              <p className="text-sm">Receive personalized advice based on your crop types.</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-3 text-3xl">⚠️</div>
              <h3 className="mb-2 font-semibold">Early Warning</h3>
              <p className="text-sm">Get alerts before water quality issues affect your crops.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
