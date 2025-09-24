import { TheDemo } from '@/core';
import { useTheDemoCreate, useTheDemoDelete, useTheDemoList } from '@/hooks';
// import { CreateCollectionFormOptionsHooks } from '@/utils/CreateCollectionFormOptionsHooks';
import { Button, Stack } from '@chakra-ui/react';
import { CollectionForm } from '../CollectionForm';
// import { useQueryClient } from '@tanstack/react-query';
// import { CollectionKey } from '@/constants';

export const Dashboard: React.FC = () => {
  //   useEffect(() => {
  //     const thing = async () => {
  //       const options = await CreateCollectionFormOptionsHooks.create(
  //         CategoryController
  //       );

  //       console.log('options:', options);
  //     };

  //     thing();
  //   }, []);

  const list = useTheDemoList();
  const createItem = useTheDemoCreate({});
  const deleteItem = useTheDemoDelete('id');

  //   const queryClient = useQueryClient();

  return (
    <Stack>
      <CollectionForm
        route=""
        inputTypes={TheDemo.inputTypes}
        inputValidation={TheDemo.inputValidation}
        onSubmit={createItem.mutateAsync}
      />

      {list?.data?.map(({ id, name }) => (
        <div key={id}>
          <pre>{JSON.stringify({ id, name }, null, 2)}</pre>
          <Button
            onClick={async () => await deleteItem.mutateAsync(id)}
            // onClick={async () =>
            //   await deleteItem.mutateAsync(id, {
            //     onSuccess: () => {
            //       //   queryClient.invalidateQueries({
            //       //     queryKey: [CollectionKey.THE_DEMO],
            //       //   });

            //       queryClient.invalidateQueries({
            //         queryKey: [CollectionKey.THE_DEMO],
            //       });
            //     },
            //   })
            // }
          >
            Delete
          </Button>
        </div>
      ))}
    </Stack>
  );
};
