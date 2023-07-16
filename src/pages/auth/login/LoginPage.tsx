import { Command } from 'lucide-react';
import { Link } from 'react-router-dom';

import { LoginForm } from './component/LoginForm';

export function LoginPage() {
  return (
    <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)',
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Command className="mr-2 h-6 w-6" /> <Link to="/">Tawnkryer</Link>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginForm />
          <p>
            Don't have an accout?{' '}
            <span className="mx-auto">
              <Link to="/create-account">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
