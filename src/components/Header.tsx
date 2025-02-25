import {
  Text,
  Container,
  Grid,
  GridItem,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import pluralize from "pluralize";
import Case from "case";
import { useCallback, useMemo } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router";
import { MenuDrawer } from ".";

const createActionTitle = (action: string, params: string[]) =>
  Case.title(
    [
      action !== "create" ? action : `${action} new`,
      [
        ...(action !== "create" ? params : params.filter(a => a !== action)),
      ].join(": "),
    ]
      .map(pluralize.singular)
      .join(" ")
  );

const usePageTitle = () => {
  const { pathname } = useLocation();
  const params = useParams();

  const hasParams = !!Object.keys(params || {})?.length;
  const hasParamSplat = !!params?.["*"];

  const parsedPathName = pathname.split("/").filter(Boolean);
  const parsedParams = (hasParams ? Object.entries(params) : [[]]).reduce(
    a => a
  );

  switch (true) {
    case hasParams && !hasParamSplat && pathname.includes("edit"):
      return createActionTitle("edit", parsedParams as string[]);

    case !hasParams && !hasParamSplat && pathname.includes("create"):
      return createActionTitle("create", parsedPathName);

    case hasParams && !hasParamSplat:
      return Case.title(parsedParams.join(": "));

    case hasParams && hasParamSplat:
      return "404";

    case pathname === "/":
      return "Dashboard";

    default:
      return Case.title(parsedPathName.join(" "));
  }
};

export const Header: React.FC = () => {
  const title = usePageTitle();
  const navigate = useNavigate();

  const isDashboard = useMemo(() => title === "Dashboard", [title]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Container>
        <Grid gridTemplateColumns="1fr auto 1fr" py={3}>
          <GridItem>
            {!isDashboard && (
              <IconButton
                aria-label="Back"
                variant="ghost"
                rounded="full"
                onClick={handleBack}
              >
                <IoChevronBackSharp />
              </IconButton>
            )}
          </GridItem>

          <GridItem as={HStack}>
            <Text>{title}</Text>
          </GridItem>

          <GridItem as={HStack} justifyContent="end">
            <MenuDrawer />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};
