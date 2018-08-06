var port = chrome.runtime.connect({name: "knockknock"}),
    infoport = chrome.runtime.connect({name: "infoport"}),
    joke = {joke: "Knock knock"},
    playback = document.getElementsByClassName("playbackSoundBadge__titleContextContainer"),
    playArtist = document.querySelector("div.playbackSoundBadge__titleContextContainer");


port.postMessage(joke);
console.log(joke);

console.log(document.querySelector("div.playbackSoundBadge__titleContextContainer"));

//let info = getPlayInfo();
//console.log(info);
//infoport.postMessage(info);


port.onMessage.addListener(function(msg) {
    console.log(port.name+": "+msg.question);
    if (msg.question == "Who's there?") {
        port.postMessage({answer: "Madame"});
    } else if (msg.question == "Madame who?") {
        port.postMessage({answer:"Madame... Bovary"});
    }
});

function getPlayInfo() {
    var playback = document.getElementsByClassName("playbackSoundBadge__titleContextContainer")[0],
        playArtist = document.querySelector("div.playbackSoundBadge__titleContextContainer a"),
        playTitle = document.querySelector("div.playbackSoundBadge__title a"),
        songInfo = {};

    console.log(document.getElementsByClassName("playbackSoundBadge__titleContextContainer")[0]);
    console.log("artist: "+playArtist.title+"\nsong: "+playTitle.title);
    songInfo = {artist: playArtist.title, title: playTitle.title};
    return songInfo;
}

// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//     console.log("listening");
//     if(msg.text && (msg.text == "report_back")) {
//         sendResponse(document.getElementByClass("userNetworkTop__title").innerHTML);
//     }
// });
