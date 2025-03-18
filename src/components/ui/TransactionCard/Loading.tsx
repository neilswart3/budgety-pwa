import { Skeleton } from '@chakra-ui/react';
import Template from './Template';

export default function Loading() {
  return (
    <Template
      variant="outline"
      bg="bg"
      category={<Skeleton borderRadius="full" h="full" w="full" />}
      title={<Skeleton w={32} h={6} />}
      subtitle={
        <>
          <Skeleton w={24} h={5} />
          <Skeleton w={24} h={5} />
        </>
      }
      amount={<Skeleton w={20} h={6} />}
      date={<Skeleton w={14} h={5} />}
    />
  );
}
