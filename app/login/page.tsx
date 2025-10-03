'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {

  useEffect(() => {
    toast.info('Mock Login')
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <section className="w-full max-w-md">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">EDeepNA</h1>
          <p className="text-muted-foreground mt-2">Deep-Sea eDNA Analysis Platform</p>
        </header>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EDeepNA Project. All rights reserved.</p>
        </footer>
      </section>
    </main>
  );
}