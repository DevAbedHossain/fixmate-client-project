"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type IconProps = { className?: string };

function GoogleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // UI-only for now: prevent the native submit until sign-in is wired to better-auth.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Card className="mx-auto w-full max-w-md py-8 shadow-2xl shadow-brand/10 [--card-spacing:--spacing(6)]">
      <CardHeader className="gap-2">
        <span className="mb-1 inline-flex size-11 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm">
          <Wrench className="size-5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <CardTitle className="text-xl font-semibold sm:text-2xl">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Sign in to book repair services and track every step of the job.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* TODO: wire to better-auth social sign-in (authClient.signIn.social). */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-2 rounded-xl"
          >
            <GoogleIcon className="size-4" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-2 rounded-xl"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </Button>
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <span className="w-full border-t border-border" />
          </span>
          <span className="relative mx-auto block w-fit bg-card px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            or continue with email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {/* TODO: point to a forgot-password route once it exists. */}
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-brand transition-colors hover:text-brand/80"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="h-11 rounded-xl pr-11"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-1 my-auto size-8 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          {/* TODO: wire to better-auth email/password sign-in. */}
          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-brand text-base text-brand-foreground hover:bg-brand/90"
          >
            Sign In
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center rounded-b-xl text-sm text-muted-foreground">
        New to FixMate?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-brand transition-colors hover:text-brand/80 underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
