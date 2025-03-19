import { ITransactionItem, useTransactions } from '@/core';
import { Skeleton, Text } from '@chakra-ui/react';
import Case from 'case';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router';

const TransactionHeader: React.FC<{ id: string }> = ({ id }) => {
  const { data, isFetching } = useTransactions.query(id);

  return (
    <>
      {!data && isFetching ? (
        <Skeleton display="inline-block" as="span" h={6} w={64} />
      ) : (
        <>Transaction: {(data as ITransactionItem).name as string}</>
      )}
    </>
  );
};

export const HeaderTitle: React.FC = () => {
  const params = useParams();
  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    switch (pathname) {
      case '/':
        return 'Dashbaoard';

      default:
        return Case.title(pathname.split('/').filter(Boolean).join('-'));
    }
  }, [pathname]);

  const dynamicTitle = useMemo(() => {
    switch (true) {
      case !!params?.transaction:
        return <TransactionHeader id={params.transaction} />;

      case !!params['*']:
      default:
        return <>Not found</>;
    }
  }, [params]);

  return <Text>{Object.keys(params).length ? dynamicTitle : pageTitle}</Text>;
};
