import { ReactElement } from "react";
import { Btn } from "./Btn";
import { InputGroupName } from "./InputGroupName";
import { Mr } from "./Mr";
import { InputForAdd } from "./InputForAdd";
import "./TabIcon.css";
import "./Group.css";
import {
  Tab,
  addTab,
  deleteGroup,
  openGroup,
  renameGroup,
  togglePinGroup,
} from "../utils/chromeStore";
import { createDateFromId } from "../utils/createDate";
import { GetDndPropsForGroup } from "../utils/useDndGroups";

interface Props {
  groupId: string;
  groupIndex: number;
  getDndProps: GetDndPropsForGroup;
  name: string;
  tabs: Tab[];
  pin?: boolean;
  renderTab: (tab: Tab, index: number) => ReactElement;
  renderTabDndPlaceHolder: () => ReactElement;
}

export const Group = ({
  groupId,
  groupIndex,
  getDndProps,
  name,
  tabs,
  pin,
  renderTab,
  renderTabDndPlaceHolder,
}: Props) => {
  const {
    current,
    draggedState,
    onDragStart,
    draggable,
    ...dndProps
  } = getDndProps(groupId, groupIndex);

  return (
    <>
      <div
        className="group"
        style={{
          marginBottom: !draggedState && tabs.length === 0 ? 0 : "8px",
          border: current ? "2px solid #d85b00" : "none",
          background: current ? "#d85a003a" : "none",
        }}
        {...dndProps}
      >
        <img
          draggable={draggable}
          onDragStart={onDragStart}
          src={"/images/drag.svg"}
          className="group__drag"
          {...(draggedState && {
            style: {
              visibility: "visible",
            },
          })}
        />
        <div className="group__title">
          <InputGroupName
            value={name}
            onBlur={(value) => renameGroup(groupId, value)}
          />
        </div>
        <Mr w={2} />
        <Btn onClick={() => openGroup(tabs)}>Open</Btn>
        <Mr w={2} />
        <Btn onClick={() => togglePinGroup(groupId)}>
          {pin ? "Unpin" : "Pin"}
        </Btn>
        {!pin && (
          <>
            <Mr w={2} />
            <Btn
              onClick={() => {
                openGroup(tabs);
                deleteGroup(groupId);
              }}
            >
              Pop
            </Btn>
            <Mr w={2} />
            <Btn onClick={() => deleteGroup(groupId)}>Delete</Btn>
          </>
        )}
        <Mr w={2} />
        <div className="group__sub">{tabs.length} tabs</div>
        <Mr w={2} />
        <div className="group__sub">{createDateFromId(groupId)}</div>
        <Mr w={2} />
        {pin && <div className="group__sub">Pinned</div>}
      </div>

      <div
        className="group__tabs"
        style={{
          height: draggedState !== null ? "0" : "100%",
          overflow: draggedState !== null ? "hidden" : "visible",
          marginBottom: draggedState !== null ? 0 : "24px",
        }}
      >
        {tabs.length === 0
          ? renderTabDndPlaceHolder()
          : tabs.map((tab, index) => renderTab(tab, index))}

        {!pin && (
          <label className="tab">
            <Mr w={3} />
            <img
              className="tabIcon"
              src="/images/cross.svg"
              style={{ transform: "rotate(45deg)" }}
            />
            <InputForAdd value="" onBlur={(value) => addTab(groupId, value)} />
          </label>
        )}
      </div>
    </>
  );
};
