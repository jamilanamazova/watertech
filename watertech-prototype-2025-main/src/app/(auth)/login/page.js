import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';
import BRAND from '@/utils/brandConfig';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Login form */}
      <div className="flex w-full items-center justify-center md:w-1/2">
        <LoginForm />
      </div>

      {/* Right side - Image and branding */}
      <div className="hidden w-1/2 bg-brand-primary md:block">
        <div className="flex h-full flex-col items-center justify-center p-8 text-white">
          <div className="mb-8">
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={200}
              height={60}
              className="h-16 w-auto"
            />
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold">{BRAND.tagline}</h1>
          <p className="text-center text-xl">{BRAND.description}</p>

          <div className="mt-12 flex w-full max-w-md flex-col space-y-4">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <h3 className="mb-2 font-semibold">Real-time Water Quality</h3>
              <p className="text-sm">
                Monitor EC, NO₃, pH, and more in real-time to make informed irrigation decisions.
              </p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <h3 className="mb-2 font-semibold">Crop-specific Recommendations</h3>
              <p className="text-sm">
                Get tailored advice for your specific crops based on current water conditions.
              </p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <h3 className="mb-2 font-semibold">Early Warning Alerts</h3>
              <p className="text-sm">
                Receive notifications about potential issues before they affect your crops.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
