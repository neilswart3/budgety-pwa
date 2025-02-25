import { Tabs as ChTabs } from "@chakra-ui/react";
import { useMemo } from "react";

const { Root, List, Trigger, Content } = ChTabs;

interface TabListItem {
  id: string;
  label: string;
}

interface TabContentItem {
  id: string;
  content: React.ReactNode;
}

type TabDataItem = TabListItem & TabContentItem;

interface Props {
  data: TabDataItem[];
}

export const Tabs: React.FC<Props> = ({ data: passedData }) => {
  const { list, content } = useMemo(
    () =>
      passedData.reduce<{ list: TabListItem[]; content: TabContentItem[] }>(
        (acc, { id, label, content }) => ({
          ...acc,
          list: [...acc.list, { id, label }],
          content: [...acc.content, { id, content }],
        }),
        { list: [], content: [] }
      ),
    [passedData]
  );

  return (
    <Root variant="enclosed" defaultValue={list[0].id} w="full">
      <List w="full">
        {list.map(({ id, label }) => (
          <Trigger key={`${id}-tab-list-item`} value={id} w="full">
            {label}
          </Trigger>
        ))}
      </List>
      {content.map(({ id, content }) => (
        <Content key={`${id}-tab-content`} value={id}>
          {content}
        </Content>
      ))}
    </Root>
  );
};
