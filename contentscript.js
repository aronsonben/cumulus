chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("content_script");
    if(msg.text === 'report_back') {
        sendResponse(document.getElementById("playbackSoundBadge_titleContextContainer"));
    }
})