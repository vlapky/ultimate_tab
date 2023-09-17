import { DragEvent, useState } from "react";

interface DraggedState {
  item: string;
  index: number;
}

type UseDndGroups = typeof useDndGroups;
export type GetDndPropsForGroup = ReturnType<UseDndGroups>["getDndProps"];

export const useDndGroups = (
  items: number[],
  setItems: (items: number[]) => void,
  onDragEnd: () => void
) => {
  const [draggedState, setDraggedState] = useState<DraggedState | null>(null);

  const handleDragStart = (e: DragEvent, { item, index }: DraggedState) => {
    setDraggedState({ item, index });
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/json", JSON.stringify(item));

      const title =
        (e.target as HTMLElement).parentNode?.childNodes[1].firstChild || "";

      e.dataTransfer.setDragImage(title as Element, 10, 10);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent, index: number) => {
    e.preventDefault();
    if (draggedState) {
      const newItems = [...items];
      newItems.splice(index, 0, newItems.splice(draggedState.index, 1)[0]);
      setItems(newItems);
      setDraggedState((prev) => prev && { ...prev, index });
    }
  };

  const handleDragEnd = () => {
    setDraggedState(null);
    onDragEnd();
  };

  const getDndProps = (item: string, index: number) => ({
    draggedState,
    current: draggedState && index === draggedState.index,
    draggable: true,
    onDragStart: (e: DragEvent) => handleDragStart(e, { item, index }),
    onDragOver: handleDragOver,
    onDragEnter: (e: DragEvent) => handleDragEnter(e, index),
    onDragEnd: handleDragEnd,
  });

  return {
    getDndProps,
  };
};
