import "./Tab.css";
import { GetDndPropsForTabs } from "../utils/useDndTabs";
import { Tab } from "../utils/chromeStore";

interface Props {
  groupId: string;
  getDndProps: GetDndPropsForTabs;
}

export const TabDndPlaceholder = ({ groupId, getDndProps }: Props) => {
  const { current, ...dndProps } = getDndProps({} as Tab, 0, groupId);

  return (
    <div
      className="tabDndContainer tabDndContainer_placeholder"
      style={{
        border: current ? "2px solid #d85b00" : "none",
        background: current ? "#d85a003a" : "none",
      }}
      {...dndProps}
    />
  );
};
