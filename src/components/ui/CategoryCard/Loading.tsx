import { Skeleton, Stack } from '@chakra-ui/react';
import Template from './Template';

export default function Loading() {
  return (
    <Template
      variant="outline"
      bg="bg"
      color="transparent"
      icon={<Skeleton borderRadius="full" h="full" w="full" />}
      title={<Skeleton w={32} h={6} />}
      content={
        <Stack>
          <Skeleton w="full" h={4} />
          <Skeleton w="2/3" h={4} />
        </Stack>
      }
    />
  );
}
