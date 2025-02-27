import {
  AbsoluteCenter,
  Box,
  Card,
  HStack,
  ProgressCircle,
  Stack,
  Text,
} from "@chakra-ui/react";

interface Props {
  label: string;
  value: number;
}

export const AccountCard: React.FC<Props> = ({ label, value }) => (
  <Card.Root as={HStack} variant="elevated">
    <Card.Body as={Stack}>
      <Box>
        <ProgressCircle.Root size="xl" value={value * 20}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range strokeLinecap="round" />
          </ProgressCircle.Circle>
          <AbsoluteCenter>
            <ProgressCircle.ValueText />
          </AbsoluteCenter>
        </ProgressCircle.Root>
      </Box>
      <HStack justify="center">
        <Text whiteSpace="nowrap">{value * 20 * 3} / 300</Text>
      </HStack>
    </Card.Body>
    <Stack flexGrow={1} flexBasis="100%">
      <Card.Header>
        <Card.Title>{label}</Card.Title>
        <Card.Description>Subtitle</Card.Description>
      </Card.Header>
      <Card.Body>
        <Card.Description>Description</Card.Description>
      </Card.Body>
    </Stack>
  </Card.Root>
);
