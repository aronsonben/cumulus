/*var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
}
*/

////////////////////////////////////////
var port = chrome.runtime.connect({name: "knockknock"}),
    infoport = chrome.runtime.connect({name: "infoport"}),
    port0 = chrome.runtime.connect({name: "content"}),
    joke = {joke: "Knock knock"},
    playback = document.getElementsByClassName("playbackSoundBadge__titleContextContainer")[0],
    playArtist = document.querySelector(".playbackSoundBadge__titleContextContainer");
//port.postMessage(joke);
//console.log(joke);
//console.log(playback);
//let info = getPlayInfo();
//console.log(info);
//infoport.postMessage(info);

var gottenFollowers = false;

// window.onload = function() {
//     getFollowers();
// }
console.log(document.getElementsByClassName("l-main g-main-scroll-area")[0]);
var list = document.getElementsByClassName("l-main g-main-scroll-area")[0];

list.addEventListener("click", clickListOnce, false);
list.addEventListener("click", clickListTwice, false);
list.addEventListener("click", clickListThrice, true);



function getFollowers() {
    var followingUsers = document.getElementsByClassName("userBadgeListItem__heading");
    for(var i=0; i < followingUsers.length; i++) {
        // console.log(followingUsers[i]);
        let link = followingUsers[i].href;
        let parent = followingUsers[i].parentElement;
        console.log(parent);
        if(parent.lastElementChild.className != "cumulusInfo") {
            let artistInfo = getInfoFromArtistUrl(link, i);
        } else {
            console.log("CONTAINS $$$");
        }
    }
}

function getInfoFromArtistUrl(link, index) {
    // get follower count from user page
    var xhr = new XMLHttpRequest();
    var artistInfoWeWant;
    var finalArtistInfo;
    console.log(link);
    xhr.open('GET', link, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, "text/html");
            var elem = doc.getElementsByName("description");
            var description; 
            if(elem != null) {
                description = elem[0];
            }
            var content = description.getAttribute("content");
            // subtract 4 from start of tracks since max that someone could have would be triple digits
            var startOfTracks = content.indexOf("Tracks. ") - 4;
            artistInfoWeWant = content.substring(startOfTracks, content.indexOf(" Stream"));
            var artistInfoTrimmed = artistInfoWeWant.trim().substring(0, 4).replace('.', '').replace('T','');
            finalArtistInfo = artistInfoTrimmed.concat(artistInfoWeWant.substring(4, artistInfoWeWant.length));
            console.log("artistInfo: " + finalArtistInfo);

            placeInfoToDOM(finalArtistInfo, index);
        }
    } 
}


function placeInfoToDOM(info, index) {
    console.log("placin info: " + info);
    var followingUsersNames = document.getElementsByClassName("userBadgeListItem__title");
    var infoDiv = document.createElement("div");
    infoDiv.className = "cumulusInfo";
    var infoText = document.createTextNode(info);
    infoDiv.appendChild(infoText);
    followingUsersNames[index].appendChild(infoDiv);
}




function clickListOnce(evt) {
    console.log('clicked list once');
}

function clickListTwice(evt) {
    console.log('clicked list twice');
}

function clickListThrice(evt) {
    console.log('clicked list thrice, launching getFollowers()');
    getFollowers();
}




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

window.addEventListener("message", function (event) {
    if(event.source != window) 
        return;
    
    if(event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        port.postMessage(event.data.text);
    }
})


// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//     console.log("listening");
//     if(msg.text && (msg.text == "report_back")) {
//         sendResponse(document.getElementByClass("userNetworkTop__title").innerHTML);
//     }
// });