import React from 'react';
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
import { signIn } from '../../../../lib/firebase/authFunctions';
import { useAuth } from '../../../../hooks/useAuth';

export function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const addAccount = useAppStore((state) => state.addAccount);
  const addProject = useAppStore((state) => state.addProject);
  const setDefaultProject = useAppStore((state) => state.setDefaultProject);
  const { login } = useAuth();

  async function handleLogin(event: any) {
    event.preventDefault();

    const result = await signIn(email, password);

    if (!result.ok) {
      console.log(result);
    } else {
      const account = {
        id: result.data.auth.user.uid,
        email: result.data.auth.user.email,
      };
      addAccount(account);
      addProject(result.data.project) // todo: get projects from db
      const defaultProject = result.data.project.filter((item: { default: any; }) => item.default)
      setDefaultProject(defaultProject) // todo: set the current project from the project data
      login(result.data.auth.user.uid as string, result.data.auth.user.email as string)
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
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              type="password"
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
