import { DragEvent, useState } from "react";
import { Groups, Tab } from "./chromeStore";

interface DraggedState {
  item: Tab;
  index: number;
  group: string;
}

type UseDndGroups = typeof useDndTabs;
export type GetDndPropsForTabs = ReturnType<UseDndGroups>["getDndProps"];

export const useDndTabs = (
  groups: Groups,
  setGroups: (groups: Groups) => void,
  onDragEnd: () => void
) => {
  const [draggedState, setDraggedState] = useState<DraggedState | null>(null);

  const handleDragStart = (
    e: DragEvent,
    { item, index, group }: DraggedState
  ) => {
    setDraggedState({ item, index, group });
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/json", JSON.stringify(item));
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent, index: number, group: string) => {
    e.preventDefault();

    if (draggedState) {
      const newGroups = { ...groups };

      if (group !== draggedState.group) {
        const newItems = newGroups[draggedState.group].tabs;
        const el = newItems.splice(draggedState.index, 1)[0];
        newGroups[group].tabs.splice(index, 0, el);
      } else {
        const newItems = newGroups[group].tabs;
        const el = newItems.splice(draggedState.index, 1)[0];
        newGroups[group].tabs.splice(index, 0, el);
      }

      setGroups(newGroups);
      setDraggedState((prev) => prev && { ...prev, index, group });
    }
  };

  const handleDragEnd = () => {
    setDraggedState(null);
    onDragEnd();
  };

  const getDndProps = (item: Tab, index: number, group: string) => ({
    current:
      draggedState &&
      group === draggedState.group &&
      index === draggedState.index,
    draggedState,
    draggable: true,
    onDragStart: (e: DragEvent) => handleDragStart(e, { item, index, group }),
    onDragOver: handleDragOver,
    onDragEnter: (e: DragEvent) => handleDragEnter(e, index, group),
    onDragEnd: handleDragEnd,
  });

  return {
    getDndProps,
  };
};
