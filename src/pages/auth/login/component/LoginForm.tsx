import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../../lib/firebase/authFunctions';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '../../../../components';

import { useAppStore } from '../../../../store/store';

export function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { addAccount } = useAppStore();
  const navigate = useNavigate();

  async function handleLogin(event: any) {
    event.preventDefault();

    const result = await signIn(email, password);

    if (!result.ok) {
      console.log(result);
    } else {
      const account = {
        id: result.value.user.uid,
        email: result.value.user.email,
      };
      addAccount(account);
      navigate('/dashboard');
      // // addProject
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              type="password"
              autoComplete="off"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
