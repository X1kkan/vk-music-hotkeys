(function () {
    if (window.__vk_bridge_installed) return;
    window.__vk_bridge_installed = true;

    console.log("[VK EXT] Bridge loaded");

    function getAP() {
        if (typeof window.getAudioPlayer === "function") {
            return window.getAudioPlayer();
        }
        if (window.ap) {
            return window.ap;
        }
        return null;
    }

    window.addEventListener("vk-media-command", (ev) => {
        const d = ev.detail;
        const ap = getAP();

        if (!ap) {
            console.warn("NO AUDIO PLAYER INSTANCE");
            return;
        }

        try {
            if (d.action === "togglePlay") {
                if (ap._isPaused || !ap._isPlaying) {
                    ap.resume({ reason: "ExtensionToggle" });
                    console.log("ap.resume()");
                } else {
                    ap.pauseByChangeChannel();
                    console.log("ap.pauseByChangeChannel()");
                }
            }

            if (d.action === "volumeChange") {
                let v = ap.getVolume();
                v = Math.max(0, Math.min(1, v + d.delta));
                ap.setVolume(v);
                console.log("volume:", v);
            }

            if (d.action === "playNext") {
                if (typeof ap.playNext === "function") {
                    ap.playNext();
                    console.log("ap.playNext()");
                }
            }

            if (d.action === "playPrev") {
                if (typeof ap.playPrev === "function") {
                    ap.playPrev();
                    console.log("ap.playPrev()");
                }
            }

        } catch (e) {
            console.error("command error", e);
        }
    });

})();
