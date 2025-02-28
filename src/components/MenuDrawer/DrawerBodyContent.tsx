import { Button } from "@chakra-ui/react";
import Case from "case";
import { useCallback, useMemo } from "react";
import {
  IoPersonSharp,
  IoReceiptSharp,
  IoShapesSharp,
  IoWalletSharp,
} from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";

interface Props {
  onClose: () => void;
}

export const DrawerBodyContent: React.FC<Props> = ({ onClose }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = useMemo(
    () =>
      pathname === "/" ? "dashboard" : pathname.split("/").filter(Boolean)[0],
    [pathname]
  );

  const handleClick = useCallback(
    (id: string) => {
      navigate(`/${id === "dashboard" ? "" : id}`);
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <>
      {Object.entries({
        dashboard: MdDashboard,
        transactions: IoReceiptSharp,
        wallet: IoWalletSharp,
        categories: IoShapesSharp,
        profile: IoPersonSharp,
      }).map(([id, Icon]) => (
        <Button
          key={Case.title(id)}
          w="full"
          variant={active === id ? "subtle" : "ghost"}
          rounded={0}
          py={4}
          justifyContent="start"
          display="flex"
          height="unset"
          onClick={() => handleClick(id)}
        >
          <Icon />
          {Case.title(id)}
        </Button>
      ))}
    </>
  );
};
