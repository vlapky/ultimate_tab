import { formatUrl } from "./formatlUrl";

export const STORAGE_KEY = "ulimate-tab-labadabadapdap^_^";

export interface Tab {
  favIconUrl?: string;
  title: string;
  url: string;
}

export interface Group {
  name: string;
  tabs: Tab[];
  pin?: boolean;
}

export interface Groups {
  [key: string]: Group;
}

export interface StoredData {
  groups: Groups;
  order: number[];
}

export const getStore = async (): Promise<StoredData> => {
  const res = await chrome.storage.local.get([STORAGE_KEY]);
  return res[STORAGE_KEY];
};

export const createStorageListener = (callback: (data: StoredData) => void) => {
  chrome.storage.onChanged.addListener((changes) => {
    if (changes[STORAGE_KEY]) {
      console.log("Store data from listener", changes[STORAGE_KEY].newValue);

      callback(changes[STORAGE_KEY].newValue);
    }
  });
};

export const openGroup = (tabs: Tab[]) => {
  tabs.forEach(({ url }) => {
    chrome.tabs.create({ url, active: false });
  });
};

export const deleteGroup = (id: string) => {
  chrome.storage.local.get([STORAGE_KEY]).then((res) => {
    const data = { ...res[STORAGE_KEY] };
    delete data.groups[id];
    if (data.order) {
      data.order = data.order.filter(
        (curId: number) => String(curId) !== String(id)
      );
    }

    chrome.storage.local.set({
      [STORAGE_KEY]: data,
    });
  });
};

export const createGroup = () => {
  chrome.storage.local.get([STORAGE_KEY]).then(() => {
    const id = Date.now();

    chrome.storage.local.get([STORAGE_KEY]).then((res) => {
      const data = { ...res[STORAGE_KEY] };
      if (!data.groups) {
        data.groups = {};
      }
      data.groups[id] = {
        name: "New group",
        tabs: [],
      };
      Array.isArray(data.order) ? data.order.unshift(id) : (data.order = [id]);

      chrome.storage.local.set({
        [STORAGE_KEY]: data,
      });
    });
  });
};

export const deleteTab = (groupId: string, tabIndex: number) => {
  chrome.storage.local.get([STORAGE_KEY]).then((res) => {
    const data = { ...res[STORAGE_KEY] };

    if (!Array.isArray(data?.groups[groupId]?.tabs)) {
      return;
    }

    data.groups[groupId].tabs.splice(tabIndex, 1);

    chrome.storage.local.set({
      [STORAGE_KEY]: data,
    });
  });
};

export const addTab = async (groupId: string, url: string) => {
  const newTab = {
    url: formatUrl(url),
    favIconUrl: "",
    title: url,
  };

  chrome.storage.local.get([STORAGE_KEY]).then((res) => {
    const data = { ...res[STORAGE_KEY] };

    if (!Array.isArray(data?.groups[groupId]?.tabs)) {
      return;
    }

    data.groups[groupId].tabs.push(newTab);

    chrome.storage.local.set({
      [STORAGE_KEY]: data,
    });
  });
};

export const togglePinGroup = (id: string) => {
  chrome.storage.local.get([STORAGE_KEY]).then((res) => {
    const data = { ...res[STORAGE_KEY] };

    const newPin = !data.groups[id].pin;
    data.groups[id] = {
      ...data.groups[id],
      pin: newPin,
    };

    chrome.storage.local.set({
      [STORAGE_KEY]: data,
    });
  });
};

export const renameGroup = (id: string, name: string) => {
  chrome.storage.local.get([STORAGE_KEY]).then((res) => {
    const data = { ...res[STORAGE_KEY] };
    data.groups[id] = {
      ...data.groups[id],
      name,
    };

    chrome.storage.local.set({
      [STORAGE_KEY]: data,
    });
  });
};

export const setStore = (data: StoredData) => {
  chrome.storage.local.set({
    [STORAGE_KEY]: data,
  });
};
