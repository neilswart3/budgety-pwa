import { Button, Card, HStack } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoArrowDownSharp, IoCloseSharp } from 'react-icons/io5';

export const InstallMessage: React.FC = () => {
  const [show, setShow] = useState<boolean>(true);

  const installPrompt = useRef<Event | null>(null);

  const handleBeforeInstallPrompt = (e: Event): void => {
    e?.preventDefault();
    installPrompt.current = e;
  };

  const handleClose = () => setShow(false);

  const handleInstallApp = useCallback(async () => {
    try {
      if (!installPrompt.current) return;

      const result = await (
        installPrompt.current as Event & { prompt: () => Promise<unknown> }
      ).prompt();

      if (result) {
        installPrompt.current = null;
        setShow(false);
      }
    } catch (error) {
      console.log('error:', error);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShow(false);
    }

    if ('getInstalledRelatedApps' in window.navigator) {
      const handleRelatedApps = async () => {
        try {
          const relatedApps = await (
            navigator as Navigator & {
              getInstalledRelatedApps: () => Promise<
                Record<'platform' | 'url', string>[]
              >;
            }
          ).getInstalledRelatedApps();

          if (relatedApps.find(({ url }) => url.includes('budgety-pwa'))) {
            setShow(false);
          }
        } catch (error) {
          console.log('error:', error);
        }
      };

      handleRelatedApps();
    }
  }, []);

  if (!show) return null;

  console.log('show:', show);

  return (
    <Card.Root bg="fg" color="bg">
      <Card.Header as={HStack} justifyContent="center">
        <Card.Title>Install me please. Its nice</Card.Title>
      </Card.Header>
      <Card.Body as={HStack} gap={4} justifyContent="center">
        <Button
          bg={{ base: 'blue.400', _dark: 'blue.600' }}
          color={{ base: 'bg', _dark: 'fg' }}
          onClick={handleInstallApp}
        >
          <IoArrowDownSharp />
          Install
        </Button>
        <Button
          variant="outline"
          color="bg"
          bg={{ _hover: 'fg.subtle' }}
          onClick={handleClose}
        >
          <IoCloseSharp />
          Dismiss
        </Button>
      </Card.Body>
    </Card.Root>
  );
};
