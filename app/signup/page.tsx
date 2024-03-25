import { SignupForm } from '@/app/ui/signup-form';

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="w-32 text-white md:w-36"></div>
        <SignupForm />
      </div>
    </main>
  );
}
