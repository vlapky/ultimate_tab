/* eslint-disable no-undef */
const STORAGE_KEY = "ulimate-tab-labadabadapdap^_^";
const PATH_TO_APP = "index.html";
const CONTEXT_MENU = [
  {
    id: "STORE_ALL_TABS",
    title: "Store all tabs",
  },
  {
    id: "CLOSE_ALL_TABS",
    title: "Close all tabs",
  },
  {
    id: "OPEN_APP",
    title: "Open app",
  },
];

const openApp = () => {
  chrome.tabs.create({ url: PATH_TO_APP, pinned: true });
};

const removeTabs = (ids) => {
  chrome.tabs.remove(ids);
};

const storeAllTabs = async () => {
  const tabs = await chrome.tabs.query({
    lastFocusedWindow: true,
    pinned: false,
  });
  const tabsForStore = tabs.map((tab) => ({
    favIconUrl: tab.favIconUrl,
    title: tab.title,
    url: tab.url,
  }));
  const tabsIds = tabs.map(({ id }) => id);

  const id = Date.now();

  chrome.storage.local.get([STORAGE_KEY]).then((res) => {
    const data = { ...res[STORAGE_KEY] };
    if (!data.groups) {
      data.groups = {};
    }
    data.groups[id] = {
      name: "New group",
      tabs: tabsForStore,
    };
    Array.isArray(data.order) ? data.order.unshift(id) : (data.order = [id]);

    chrome.storage.local.set({
      [STORAGE_KEY]: data,
    });
  });

  removeTabs(tabsIds);
};

const closeAllTabs = async () => {
  const tabs = await chrome.tabs.query({
    lastFocusedWindow: true,
    pinned: false,
  });
  const tabsIds = tabs.map(({ id }) => id);
  removeTabs(tabsIds);
};

chrome.runtime.onInstalled.addListener((details) => {
  // ingore chrome_update events
  if (details.reason !== "install") {
    return;
  }

  // create contextMenus
  CONTEXT_MENU.forEach(({ id, title }) => {
    chrome.contextMenus.create({
      id,
      title,
      contexts: ["all"],
    });
  });

  // check and create empty store
  chrome.storage.local.get([STORAGE_KEY]).then((res) => {
    const data = { ...res[STORAGE_KEY] };

    if (!data.groups || !data.order) {
      data.groups = {};
      data.order = [];

      chrome.storage.local.set({
        [STORAGE_KEY]: data,
      });
    }
  });

  openApp();
});

// extenstion icon click
chrome.action.onClicked.addListener(() => {
  storeAllTabs();
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "STORE_ALL_TABS") {
    storeAllTabs();
  }

  if (info.menuItemId === "CLOSE_ALL_TABS") {
    closeAllTabs();
  }

  if (info.menuItemId === "OPEN_APP") {
    openApp();
  }

  return;
});
