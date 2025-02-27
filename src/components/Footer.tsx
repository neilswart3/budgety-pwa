import {
  Box,
  ButtonGroup,
  Container,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  IoAddSharp,
  IoHomeSharp,
  IoPersonSharp,
  IoReceiptSharp,
  IoWalletSharp,
} from "react-icons/io5";
import { NavLink } from "react-router";

interface Props {
  to?: string;
  label: string;
  icon: IconType;
}

const FooterButton: React.FC<Props> = ({ to, label, icon: PassedIcon }) => {
  return (
    <IconButton
      {...(to ? { to, as: NavLink } : {})}
      w={16}
      h="unset"
      p={2}
      fontSize="xs"
      variant="plain"
      color="bg"
    >
      <Stack alignItems="center">
        <Icon>
          <PassedIcon />
        </Icon>
        <Box>{label}</Box>
      </Stack>
    </IconButton>
  );
};

export const Footer: React.FC = () => {
  return (
    <Container pos="relative">
      <Box pos="absolute" left={0} top={0} h="full" w="full">
        <HStack
          pos="relative"
          alignItems="center"
          justifyContent="center"
          w="full"
          h="full"
          overflow="hidden"
        >
          <Box
            pos="absolute"
            bottom={0}
            bg="fg"
            w="full"
            h="220%"
            mask="radial-gradient(circle, green 2.5rem, rgba(0, 0, 0, 0) 2rem), linear-gradient(#000 0 0) no-repeat"
            maskPosition="right"
            WebkitMaskPosition="left"
            maskComposite="exclude"
          />
        </HStack>
      </Box>

      <ButtonGroup as={Grid} gridTemplateColumns="1fr 1fr 1fr 1fr 1fr" gap={0}>
        <GridItem>
          <FooterButton to="/" label="Home" icon={IoHomeSharp} />
        </GridItem>
        <GridItem>
          <FooterButton
            to="/transactions"
            label="Transactions"
            icon={IoReceiptSharp}
          />
        </GridItem>
        <GridItem
          as={HStack}
          alignItems="center"
          justifyContent="center"
          pos="relative"
          h="full"
        >
          <Stack pos="absolute" bottom="50%" p={2} zIndex={10}>
            <IconButton
              {...{ to: "/transactions/create" }}
              as={NavLink}
              rounded="full"
              size="2xl"
              bg={{ base: "blue.600", _dark: "blue.400" }}
            >
              <Icon>
                <IoAddSharp />
              </Icon>
            </IconButton>
          </Stack>
        </GridItem>
        <GridItem>
          <FooterButton to="/wallet" label="Wallet" icon={IoWalletSharp} />
        </GridItem>
        <GridItem>
          <FooterButton to="/account" label="Account" icon={IoPersonSharp} />
        </GridItem>
      </ButtonGroup>
    </Container>
  );
};
