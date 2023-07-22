import { Button } from '../../components';
import { adWordAuth } from '../../lib/network/getKeywords';

export function DashboardPage() {
  return (
    <>
      <div>Dashboard</div>
      <p>This is The Dashboard Page</p>
      <Button onClick={adWordAuth}>Add Word</Button>
    </>
  );
}
