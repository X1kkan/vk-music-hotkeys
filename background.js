chrome.commands.onCommand.addListener(async (command) => {
    console.log("HOTKEY:", command);

    const tabs = await chrome.tabs.query({ url: "*://vk.com/*" });
    if (!tabs.length) {
        console.warn("VK TAB NOT FOUND");
        return;
    }

    const tabId = tabs[0].id;

    switch (command) {
        case "toggle_play":
            chrome.tabs.sendMessage(tabId, { action: "togglePlay" });
            break;
        case "volume_up":
            chrome.tabs.sendMessage(tabId, { action: "volumeChange", delta: +0.005 }); // delta = volume, def: +0.005
            break;
        case "volume_down":
            chrome.tabs.sendMessage(tabId, { action: "volumeChange", delta: -0.005 }); // delta = volume, def: -0.005
            break;
        case "next_track":
            chrome.tabs.sendMessage(tabId, { action: "playNext" });
            break;
        case "prev_track":
            chrome.tabs.sendMessage(tabId, { action: "playPrev" });
            break;
    }
});
