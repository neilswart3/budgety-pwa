import { Tabs } from "@/components/ui";
import { Savings, Accounts } from "@/components";

export const Wallet: React.FC = () => (
  <Tabs
    data={[
      {
        id: "savings",
        label: "Savings",
        content: <Savings />,
      },
      {
        id: "accounts",
        label: "Accounts",
        content: <Accounts />,
      },
    ]}
  />
);
