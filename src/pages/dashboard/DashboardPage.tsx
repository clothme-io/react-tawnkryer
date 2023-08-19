/* eslint-disable react/jsx-no-bind */
import { Button } from '../../components';

export function DashboardPage() {

  function onSubmit() {
    window.location.href = 'http://127.0.0.1:5000/account/authorize?user=1';
  }

  return (
    <>
      <div>Dashboard</div>
      <p>This is The Dashboard Page</p>
      <Button onClick={onSubmit}>Connect Google Keyword</Button>
    </>
  );
}
