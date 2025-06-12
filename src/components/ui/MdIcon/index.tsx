import { Box, Skeleton } from '@chakra-ui/react';
import IconWorker from '@/workers/iconWorker?worker';
import { useEffect, useState } from 'react';

interface Props {
  icon: string;
}

export const MdIcon: React.FC<Props> = ({ icon }) => {
  const [rawIcon, setRawIcon] = useState<string>();

  useEffect(() => {
    const iconWorker = new IconWorker();

    iconWorker.onmessage = ({ data }) => setRawIcon(data);
    iconWorker.postMessage(icon);

    return () => iconWorker.terminate();
  }, [icon]);

  return (
    <>
      {rawIcon ? (
        <Box dangerouslySetInnerHTML={{ __html: rawIcon }} />
      ) : (
        <Skeleton rounded="full" h="full" w="full" />
      )}
    </>
  );
};
