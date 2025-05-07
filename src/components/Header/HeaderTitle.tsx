// import {
//   ICategoryItem,
//   ITransactionItem,
//   useCategories,
//   useTransactions,
// } from '@/core';
import {
  //  Skeleton,
  Text,
} from '@chakra-ui/react';
import Case from 'case';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router';

// const BaseHeader: React.FC<{
//   name: string | undefined;
//   isFetching: boolean;
//   label: string;
// }> = ({ label, name, isFetching }) => (
//   <>
//     {!name && isFetching ? (
//       <Skeleton display="inline-block" as="span" h={6} w={64} />
//     ) : (
//       <>
//         {label}: {name as string}
//       </>
//     )}
//   </>
// );

const TransactionHeader: React.FC<{ id: string }> = ({ id }) => {
  //   const { data, isFetching } = useTransactions.single(id);

  //   return (
  //     <BaseHeader
  //       name={(data as ITransactionItem)?.name}
  //       isFetching={isFetching}
  //       label="Transaction"
  //     />
  //   );
  return <>TransactionHeader: {id}</>;
};

const CategoryHeader: React.FC<{ id: string }> = ({ id }) => {
  //   const { data, isFetching } = useCategories.single(id);

  //   return (
  //     <BaseHeader
  //       name={(data as ICategoryItem)?.name}
  //       isFetching={isFetching}
  //       label="Category"
  //     />
  //   );

  return <>CategoryHeader: {id}</>;
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
      case !!params?.category:
        return <CategoryHeader id={params.category} />;
      case !!params['*']:
      default:
        return <>Not found</>;
    }
  }, [params]);

  return <Text>{Object.keys(params).length ? dynamicTitle : pageTitle}</Text>;
};
