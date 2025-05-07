import { ThemeIcon, themeIcons } from '@/old/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconType } from 'react-icons';

interface Props {
  initQuery?: ThemeIcon;
}

export const useSearchIcons = ({ initQuery }: Props = {}) => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [icons, setIcons] = useState<
    { key: ThemeIcon; Icon: IconType }[] | undefined
  >(undefined);
  const iconMap = useMemo(() => new Map(Object.entries(themeIcons)), []);

  const handleSearch = useCallback(
    (query: string): void => {
      if (!worker || (query && query?.trim()?.length < 2)) return;

      worker.postMessage({ data: Object.keys(themeIcons), query });

      worker.onmessage = ({ data }: { data: ThemeIcon[] }) => {
        setIcons(
          data.reduce(
            (acc: { key: ThemeIcon; Icon: IconType }[], key: ThemeIcon) => [
              ...acc,
              { key, Icon: iconMap.get(key) as IconType },
            ],
            []
          )
        );
      };
    },
    [iconMap, worker]
  );

  useEffect(() => {
    const instance = new Worker(
      new URL('../../workers/iconSearchWorker.ts', import.meta.url),
      { type: 'module' }
    );

    setWorker(instance);

    return () => instance.terminate();
  }, []);

  useEffect(() => {
    if (worker && initQuery && initQuery?.trim()?.length > 1) {
      handleSearch(initQuery);
    }
  }, [handleSearch, initQuery, worker]);

  return {
    icons,
    handleIconSearch: handleSearch,
  };
};
