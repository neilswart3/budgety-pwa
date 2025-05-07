import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  IconButton,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { DrawerTitle } from "./DrawerTitle";
import { DrawerFooterContent } from "./DrawerFooterContent";
import { DrawerBodyContent } from "./DrawerBodyContent";

export const MenuDrawer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="Menu"
        variant="ghost"
        rounded="full"
        onClick={handleOpen}
      >
        <IoMenuSharp />
      </IconButton>
      <Portal>
        <DrawerRoot open={open} placement="end" contained={true}>
          <DrawerBackdrop />
          <DrawerContent position="fixed" top={0} right={0} h="full">
            <DrawerHeader py={3} px={4}>
              <DrawerTitle onClose={handleClose} />
            </DrawerHeader>
            <DrawerBody as={Stack} py={3} px={0}>
              <DrawerBodyContent onClose={handleClose} />
            </DrawerBody>
            <DrawerFooter py={3} px={4}>
              <DrawerFooterContent />
            </DrawerFooter>
          </DrawerContent>
        </DrawerRoot>
      </Portal>
    </>
  );
};
