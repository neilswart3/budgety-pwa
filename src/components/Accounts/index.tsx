import { Stack } from "@chakra-ui/react";
import { AccountCard } from "@/components/ui";

export const Accounts: React.FC = () => (
  <Stack gap={3}>
    {[...Array(6)].map((_, i) => (
      <AccountCard key={`account-card-${i}`} value={i} label="Account Item" />
    ))}
  </Stack>
);
