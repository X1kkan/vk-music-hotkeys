(function () {

    function injectBridge() {
        const s = document.createElement("script");
        s.src = chrome.runtime.getURL("page_bridge.js");
        s.onload = () => s.remove();
        document.documentElement.appendChild(s);
    }

    injectBridge();

    chrome.runtime.onMessage.addListener((msg) => {
        console.log("CONTENT RECEIVED:", msg);

        window.dispatchEvent(
            new CustomEvent("vk-media-command", { detail: msg })
        );
    });

})();
