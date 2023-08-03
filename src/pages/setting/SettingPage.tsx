/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import { redirect } from 'react-router-dom';
// import { useEffect } from 'react';
import { Button } from '../../components';

export function SettingPage() {
  const loggedInEmail = localStorage.getItem('tempUser');

  if (!loggedInEmail) {
    redirect('/login');
  }

  function onSubmit() {
    window.location.href = `http://127.0.0.1:5000/authorize?email=${loggedInEmail}`;
  }

  return (
    <>
      <div>Settings</div>
      <Button onClick={onSubmit}>Connect Google Keyword</Button>
    </>
  );
}
