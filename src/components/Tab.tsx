import { TabIcon } from "./TabIcon";
import "./Tab.css";
import { Tab as TabT, deleteTab } from "../utils/chromeStore";
import { GetDndPropsForTabs } from "../utils/useDndTabs";

interface Props {
  tab: TabT;
  groupId: string;
  index: number;
  pin?: boolean;
  getDndProps: GetDndPropsForTabs;
}

export const Tab = ({ tab, groupId, index, pin, getDndProps }: Props) => {
  const { favIconUrl, title, url } = tab;
  const { current, draggedState, ...dndProps } = getDndProps(
    tab,
    index,
    groupId
  );

  const hideDeleteBtn = pin || draggedState;

  return (
    <div
      className="tabDndContainer"
      key={index}
      style={{
        border: current ? "2px solid #d85b00" : "none",
        background: current ? "#d85a003a" : "none",
        left: current ? "-2px" : "0",
      }}
    >
      <div className="tab">
        <img
          className="tab__delete"
          src={"/images/cross.svg"}
          onClick={() => deleteTab(groupId, index)}
          {...(hideDeleteBtn && {
            style: {
              visibility: "hidden",
            },
          })}
        />

        <TabIcon src={favIconUrl} />

        <a
          className="tab__link"
          href={url}
          target="_blank"
          {...(draggedState && {
            style: {
              textDecoration: "none",
            },
          })}
          {...dndProps}
        >
          {title}
        </a>
      </div>
    </div>
  );
};
