import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Group } from "./Group";
import { Tab } from "./Tab";
import { TabDndPlaceholder } from "./TabDndPlaceholder";
import "./App.css";
import {
  StoredData,
  createStorageListener,
  getStore,
  setStore,
} from "../utils/chromeStore";
import { useDndTabs } from "../utils/useDndTabs";
import { useDndGroups } from "../utils/useDndGroups";

export const App = () => {
  const [data, setData] = useState<StoredData | null>(null);

  const handleUpdate = async () => {
    let res = null;
    res = await getStore();

    console.log("Store data from getStore", res);
    setData(res || null);
  };

  useEffect(() => {
    handleUpdate();
  }, []);

  useEffect(() => {
    createStorageListener(setData);
  }, []);

  const { getDndProps: getDndPropsForTabs } = useDndTabs(
    data?.groups ?? {},
    (groups) => setData((prev) => prev && { ...prev, groups }),
    () => {
      data && setStore(data);
    }
  );

  const { getDndProps: getDndPropsForGroups } = useDndGroups(
    data?.order ?? [],
    (order) => setData((prev) => prev && { ...prev, order }),
    () => {
      data && setStore(data);
    }
  );

  if (data === null) {
    return <>Storage not loaded. Try delete and instal app again.</>;
  }

  return (
    <div className="app">
      <Header />

      <>
        {data.order.length === 0 && (
          <h2>
            You can add tabs by clicking on the extension icon or by creating a
            group
          </h2>
        )}
        {data.order.map((groupIdNum, groupIndex) => {
          const groupId = String(groupIdNum);
          const { name, tabs, pin } = data.groups[groupId];

          return (
            <Group
              groupId={groupId}
              groupIndex={groupIndex}
              name={name}
              tabs={tabs}
              pin={pin}
              getDndProps={getDndPropsForGroups}
              renderTab={(tab, index) => (
                <Tab
                  tab={tab}
                  groupId={groupId}
                  index={index}
                  pin={pin}
                  getDndProps={getDndPropsForTabs}
                />
              )}
              renderTabDndPlaceHolder={() => (
                <TabDndPlaceholder
                  groupId={groupId}
                  getDndProps={getDndPropsForTabs}
                />
              )}
            />
          );
        })}
      </>
    </div>
  );
};
