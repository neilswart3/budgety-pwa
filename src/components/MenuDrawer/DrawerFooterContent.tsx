import { Avatar, HStack, IconButton } from "@chakra-ui/react";
import { IoLogOutSharp } from "react-icons/io5";

export const DrawerFooterContent: React.FC = () => (
  <HStack
    bg="bg.emphasized"
    rounded="lg"
    py={3}
    px={4}
    w="full"
    alignItems="center"
    justifyContent="space-between"
  >
    <HStack>
      <Avatar.Root>
        <Avatar.Fallback name="Nelly Something" />
        <Avatar.Image src="https://randomuser.me/api/portraits/men/42.jpg" />
      </Avatar.Root>
      Nelly Something
    </HStack>

    <IconButton variant="ghost" rounded="full">
      <IoLogOutSharp />
    </IconButton>
  </HStack>
);
