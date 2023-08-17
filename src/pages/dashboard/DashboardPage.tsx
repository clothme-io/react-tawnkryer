/* eslint-disable react/jsx-no-bind */
import { useEffect } from 'react';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';

// Store
import { useAppStore } from '../../store/store';

export function DashboardPage() {
  const navigate = useNavigate();
  const account = useAppStore((state) => state.account);

  function onSubmit() {
    window.location.href = 'http://127.0.0.1:5000/account/authorize?user=1';
  }

  if (account.email !== '' || account.id !== '') {
    console.log('Got here Also ')

    navigate('login', { replace: true }); // <-- redirect
  }

  useEffect(() => {
    console.log('Got here')
    if (account.email !== '' || account.id !== '') {
      console.log('Got here Also ')

      navigate('login', { replace: true }); // <-- redirect
    }
  }, []);

  return (
    <>
      <div>Dashboard</div>
      <p>This is The Dashboard Page</p>
      <Button onClick={onSubmit}>Connect Google Keyword</Button>
    </>
  );
}
