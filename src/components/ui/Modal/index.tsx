import {
  Grid,
  GridItem,
  HStack,
  IconButton,
  Portal,
  Stack,
} from '@chakra-ui/react';
import {
  cloneElement,
  createContext,
  Dispatch,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalContextState {
  open: boolean;
}

const initialContextState: ModalContextState = { open: false };
const ModalContext = createContext<ModalContextState>(initialContextState);

type ModalDispatchContextState = null | Dispatch<
  SetStateAction<ModalContextState>
>;
const ModalDispatchContext = createContext<ModalDispatchContextState>(null);

const ModalProvider: React.FC<PropsWithChildren> & {
  Trigger: React.FC<PropsWithChildren>;
  Content: React.FC<PropsWithChildren>;
  Body: React.FC<PropsWithChildren>;
  Header: React.FC<PropsWithChildren>;
  Footer: React.FC<PropsWithChildren>;
} = ({ children }) => {
  const [state, setState] = useState(initialContextState);

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={setState}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

const ModalTrigger: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useContext(ModalDispatchContext);

  return (
    <>
      {cloneElement(children as ReactElement<HTMLAttributes<HTMLElement>>, {
        onClick: () =>
          dispatch && dispatch((state) => ({ ...state, open: !state.open })),
      })}
    </>
  );
};

const ModalHeader: React.FC<PropsWithChildren> = ({ children }) => (
  <HStack p={2} justifyContent="space-between">
    {children}
    <ModalTrigger>
      <IconButton variant="ghost" rounded="full">
        <IoClose />
      </IconButton>
    </ModalTrigger>
  </HStack>
);

const ModalBody: React.FC<PropsWithChildren> = ({ children }) => (
  <Stack
    p={2}
    borderYWidth={1}
    h="full"
    flexGrow={1}
    backgroundColor="red"
    className="ModalBody"
  >
    {children}
  </Stack>
);

const ModalFooter: React.FC<PropsWithChildren> = ({ children }) => (
  <HStack justifyContent="flex-start" p={2} backgroundColor="orange">
    {children}
  </HStack>
);

const ModalContent: React.FC<PropsWithChildren> = ({ children }) => {
  const { open } = useContext(ModalContext);

  if (!open || !children) return null;

  const gridTemplateRows = [
    ...(Array.isArray(children) ? children : [children]),
  ].reduce(
    (acc: string, { type }, i) =>
      `${acc}${i > 0 ? ' ' : ''}${
        type.displayName === 'ModalBody' ? '1fr' : 'auto'
      }`,
    ''
  );

  return (
    <Portal>
      <Stack
        //   pos="fixed"
        left={0}
        top={0}
        bg="bg"
        w="full"
        zIndex={10}
        gap={0}
      >
        <Grid h="dvh" maxH="dvh" gridTemplateRows={gridTemplateRows}>
          {children}
        </Grid>
      </Stack>
    </Portal>
  );
};

ModalHeader.displayName = 'ModalHeader';
ModalBody.displayName = 'ModalBody';
ModalFooter.displayName = 'ModalFooter';

ModalProvider.Trigger = ModalTrigger;
ModalProvider.Content = ModalContent;
ModalProvider.Body = ModalBody;
ModalProvider.Header = ModalHeader;
ModalProvider.Footer = ModalFooter;

export const Modal = ModalProvider;
