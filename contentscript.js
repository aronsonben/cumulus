var port = chrome.runtime.connect({name: "knockknock"}),
    joke = {joke: "Knock knock"};


port.postMessage(joke);
console.log(joke);
port.onMessage.addListener(function(msg) {
    console.log(port.name+": "+msg.question);
    if (msg.question == "Who's there?") {
        port.postMessage({answer: "Madame"});
    } else if (msg.question == "Madame who?") {
        port.postMessage({answer:"Madame... Bovary"});
    }
});
