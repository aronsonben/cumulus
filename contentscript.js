var port = chrome.runtime.connect();

//alert(document.getElementById("playbackSoundBadge_titleContextContainer"));

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
    });