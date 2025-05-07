import {
  Button,
  Grid,
  //   GridItem,
  //   Icon,
  //   Input,
  //   Stack,
  //   Text,
} from '@chakra-ui/react';
// import Case from 'case';
// import {
//   //   ChangeEvent,
//   //   MouseEvent,
//   //   useCallback,
//   useEffect,
//   //   useRef,
//   useState,
// } from 'react';
// import { Field } from '../field';
// import { useSearchIcons } from '@/hooks';
import { Modal } from '../Modal';
import { ThemeIcon } from '@/old/core';

interface Props {
  iconKey?: ThemeIcon;
}

// const useDebounce = (callback: (args: unknown) => void, delay: number) => {
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   return useCallback(
//     (args: unknown) => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);

//       timeoutRef.current = setTimeout(() => {
//         callback(args);
//       }, delay);
//     },
//     [callback, delay]
//   );
// };

export const IconSelector: React.FC<Props> = ({ iconKey }) => {
  //   const [query, setQuery] = useState<string>(
  //     // iconKey ? iconKey.replace(/Md/, '') : ''
  //     ''
  //   );
  //   const [selected, setSelected] = useState<ThemeIcon | undefined>(iconKey);
  //   const { icons, handleIconSearch } = useSearchIcons({
  //     initQuery: iconKey,
  //   });

  //   const handleSearch = useCallback(
  //     (query: string) => {
  //       handleIconSearch(query);
  //     },
  //     [handleIconSearch]
  //   );

  //   const handleSearchDebounce = useDebounce(
  //     (args) => handleSearch(args as string),
  //     1000
  //   );

  //   const handleChange = useCallback(
  //     ({ target }: ChangeEvent<HTMLInputElement>) => {
  //       setQuery(target.value);

  //       if (target.value.trim().length < 2) return;

  //       handleSearchDebounce(target.value);
  //     },
  //     [handleSearchDebounce]
  //   );

  //   const handleSelect = (e: MouseEvent<HTMLButtonElement>) => {
  //     setSelected(
  //       (e.target as HTMLElement)
  //         ?.closest('button')
  //         ?.attributes?.getNamedItem('data-key')?.nodeValue as ThemeIcon
  //     );
  //   };

  //   useEffect(() => {
  //     if (iconKey && !query) {
  //       const newQuery = iconKey.replace(/Md/, '');
  //       setQuery(newQuery);
  //       handleSearch(newQuery);
  //     }
  //   }, [handleSearch, iconKey, query]);

  return (
    <Modal>
      <Modal.Trigger>
        <Button>Select Icon</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>Select Icon</Modal.Header>
        <Modal.Body>
          <Grid
            gap={5}
            gridTemplateRows="auto 1fr"
            // flexGrow={1}
            h="full"
            // maxH="full"
            overflow="hidden"
          >
            {iconKey}
            {/* <GridItem>
              <Field label="Search">
                <Input name="search" value={query} onChange={handleChange} />
              </Field>
            </GridItem> */}
            {/* <GridItem
              //   flexGrow={1}
              //   maxH="full"
              height="full"
              //   backgroundColor="blue"
              //   overflow="hidden"
              //   overflowY="scroll"
              //   p={2}
            >
              <Grid
                gap={2}
                gridTemplateColumns="repeat(auto-fill, minmax(7rem, 1fr))"
                backgroundColor="green"
                // height="full"
                maxH="full"
                overflow="hidden"
                // overflowY="scroll"
              >
                {icons?.map(({ key, Icon: IconValue }) => (
                  <Button
                    key={key}
                    alignItems="start"
                    h="initial"
                    whiteSpace="initial"
                    data-key={key}
                    transition="background-color 0.5s ease"
                    onClick={handleSelect}
                    {...(selected === key
                      ? {
                          bg: { base: 'blue.600', _dark: 'blue.400' },
                        }
                      : {})}
                  >
                    <Stack alignItems="center" textAlign="center" p={2}>
                      <Icon h={8} w={8}>
                        <IconValue />
                      </Icon>
                      <Text fontSize="xs">
                        {Case.title(key.replace(/^Md/, ''))}
                      </Text>
                    </Stack>
                  </Button>
                ))}
              </Grid>
            </GridItem> */}
          </Grid>
        </Modal.Body>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
