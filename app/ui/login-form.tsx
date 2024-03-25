'use client';

import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authentificate } from '../lib/action';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { GoogleSignInButton } from '@/app/components/authButton';
import { cn } from '@/utils/cn';
import { Label } from './label';
import { Input } from './input';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authentificate, undefined);

  return (
    <form action={dispatch} className="my-8">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to Log in Form
        </h2>

        <div className="my-8 ">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              minLength={6}
              required
            />
          </LabelInputContainer>
        </div>
        <LoginButton />
        <p className="mb-3 mt-5 block text-xs font-medium text-gray-900">
          if don`t have account go to <a href="/signup">Registration form</a>
        </p>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <GoogleSignInButton />
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  const BottomGradient = () => {
    return (
      <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
      </>
    );
  };

  return (
    <Button aria-disabled={pending}>
      Log in &rarr;
      <BottomGradient />
    </Button>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};
