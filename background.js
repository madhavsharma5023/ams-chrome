//Background Script to remember the Activity of the User

chrome.storage.sync.get('token', function (data) {
    // alert(data.token);

    if (typeof data.token === "undefined") {
        chrome.browserAction.setPopup({ popup: "url.html" })
    }
    else {
        if (data.token == 1) {
            chrome.browserAction.setPopup({ popup: "index.html" })
        }

        else {
            chrome.browserAction.setPopup({ popup: "checkin.html" })
        }

    }

});
function launch() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: { width: 620, height: 500 }
  });
}
chrome.runtime.onMessage.addListener(data => {
  if (data.type === 'notification' && data.total != '' && data.message !='') {
    chrome.notifications.create('', data.options);
  }
 chrome.browserAction.setBadgeText({text: data.total});
});

