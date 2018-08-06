var url = "https://soundcloud.com/tio574/following",
    port = chrome.runtime.connect({name: "knockknock"});

function domStuff(domContent) {
    console.log('DOM content:\n' + domContent);
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'soundcloud.com'},
            })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.runtime.onConnect.addListener(function(port) {
    if(port.name == "knocknock") {
        port.onMessage.addListener(function(msg) {
            console.log(port.name+": "+msg.joke+", "+msg.answer);
            if (msg.joke == "Knock knock") {
                console.log("found 'Knock knock'");
                port.postMessage({question: "Who's there?"});
            } else if (msg.answer == "Madame") {
                port.postMessage({question: "Madame who?"});
            } else if (msg.answer == "Madame... Bovary") {
                port.postMessage({question: "I don't get it."});
            }
        });
    }
    if(port.name == "infoport") {
        port.onMessage.addListener(function(msg) {
            console.log(port.name+": "+msg.artist);
        });
    }
});


// chrome.pageAction.onClicked.addListener(function(tab) {
//     chrome.tabs.sendMessage(tab.id, {text: "report_back"}, domStuff);
// });