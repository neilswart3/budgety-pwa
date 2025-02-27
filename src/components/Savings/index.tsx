import { Stack } from "@chakra-ui/react";
import { AccountCard } from "@/components/ui";

export const Savings: React.FC = () => (
  <Stack gap={3}>
    {[...Array(3)].map((_, i) => (
      <AccountCard key={`savings-card-${i}`} value={i} label="Savings Item" />
    ))}
  </Stack>
);
