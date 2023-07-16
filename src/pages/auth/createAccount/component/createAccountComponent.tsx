import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../../lib/firebase/authFunctions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
} from '../../../../components/index';

export function CreateAccountComponent() {
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const result = await signUp(email, password);

    if (!result.ok) {
      console.log(result);
      const { message } = result.error;
      setErrorMessage(message);
    } else {
      // else successful
      console.log(result);
      navigate('/login');
    }
  };

  return (
    <>
      <form onSubmit={handleForm}>
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
              Create account
            </Button>
          </CardFooter>
        </Card>
      </form>
      <p className="text-color: red">{errorMessage}</p>
    </>
  );
}
