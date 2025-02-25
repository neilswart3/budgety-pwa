import { Tabs } from "../ui";

export const Wallet: React.FC = () => (
  <Tabs
    data={[
      {
        id: "savings",
        label: "Savings",
        content: <div>Savings</div>,
      },
      {
        id: "accounts",
        label: "Accounts",
        content: <div>Accounts</div>,
      },
    ]}
  />
);
