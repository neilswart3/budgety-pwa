import { Tabs } from '@/components/ui';
import { Savings, Accounts } from '@/components';

export const Wallet: React.FC = () => (
  <Tabs
    data={[
      {
        id: 'accounts',
        label: 'Accounts',
        content: <Accounts.List />,
      },
      {
        id: 'savings',
        label: 'Savings',
        content: <Savings />,
      },
    ]}
  />
);
