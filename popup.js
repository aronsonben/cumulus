let changeColor = document.getElementById('changeColor');
let getinfoBtn = document.getElementById('getinfo');
let songTitle = document.getElementById('songTitle');
let songArtist = document.getElementById('songArtist');

//var port = chrome.runtime.connect({name: "knockknock"});

/*
chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    })
}
*/

getinfoBtn.onclick = function (element) {
    console.log("clicked button");
}


