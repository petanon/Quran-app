const {contextBridge, ipcRenderer } = require("electron");
const electron = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        receive: (channel, func) => {
            let validChannels = ["update_status"]
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => {
                    func(...args)
                });
            }
        },
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["get_update_status"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        }
    }
);