'use client';

import { SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Sign In to GraphBit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInButton mode="modal">
            <Button className="w-full">Sign In</Button>
          </SignInButton>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}