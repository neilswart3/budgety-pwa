import {
  DrawerTitle as ChDrawerTitle,
  HStack,
  Avatar,
  DrawerCloseTrigger,
  IconButton,
} from "@chakra-ui/react";
import { IoCloseSharp } from "react-icons/io5";

interface Props {
  onClose: () => void;
}

export const DrawerTitle: React.FC<Props> = ({ onClose }) => (
  <ChDrawerTitle as={HStack} justifyContent="space-between">
    <HStack>
      <Avatar.Root shape="square" bg="transparent">
        <Avatar.Image src="/pwa-192x192.png" />
      </Avatar.Root>
      Budgety
    </HStack>
    <DrawerCloseTrigger onClick={onClose}>
      <IconButton variant="ghost" rounded="full">
        <IoCloseSharp />
      </IconButton>
    </DrawerCloseTrigger>
  </ChDrawerTitle>
);
