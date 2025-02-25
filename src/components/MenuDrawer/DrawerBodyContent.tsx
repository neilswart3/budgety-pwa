import { Button } from "@chakra-ui/react";
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
      {[
        { id: "dashboard", label: "Dashboard", Icon: MdDashboard },
        { id: "transactions", label: "Transactions", Icon: IoReceiptSharp },
        { id: "wallet", label: "Wallet", Icon: IoWalletSharp },
        { id: "categories", label: "Categories", Icon: IoShapesSharp },
        { id: "account", label: "Account", Icon: IoPersonSharp },
      ].map(({ id, label, Icon }) => (
        <Button
          key={id}
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
          {label}
        </Button>
      ))}
    </>
  );
};
