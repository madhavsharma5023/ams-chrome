window.onload = function () {
    //Getting the Token i.e Saved After Login
    chrome.storage.sync.get('token', function (data) {
        chrome.storage.sync.get('tok_exp', function (data2) {
            chrome.storage.sync.get('Pasted_url', function (data3) {

                var out_url = data3.Pasted_url;
                out_url += "/api/auth/markattendance"
                var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                var out_url2 = data3.Pasted_url;
                    out_url2 += "/api/auth/checkinCheckout"

                //Making Functions for the Buttons
                document.getElementById('Checkout').onclick = function () {
                    
                    event.preventDefault()


                    //AMS Api for checking the time
                    fetch(proxyUrl + out_url2, {

                        headers: {
                            'Authorization': 'Bearer ' + data.token
                        }
                        // body:formData,


                    })
                        .then(function (response) {
                            return response.json();

                        }).then(function (response) {

                            // alert(response.status)
                            // alert(response.earlyCheckout.message)
                            // alert(response.earlyCheckout.earlyCheckout)
                           
                            if(response.earlyCheckout.earlyCheckout){
                                // alert(response.lateCheckin.lateCheckin)
                                alert(response.earlyCheckout.message)
                                
                                //taking user to the late checkin forum
                                //chrome.browserAction.setPopup({ popup: "early_checkout.html" })
                                       // window.location.href = 'early_checkout.html'
                            }

                            else{
                                  //Fetching using Post Method
                    fetch(proxyUrl + out_url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + data.token,
                            // 'Content-Type': 'application/json',

                        },
                    })
                        .then(function (response) {
                            return response.json();

                        })
                        .then(function (response) {

                            if (response.message == "Unauthenticated.") {

                                alert("Attendance Not Marked!")
                            }

                            else {
                                // alert(response.status)
                                console.log(response)
                                // alert("You have been Checked Out!")
                                // chrome.browserAction.setPopup({ popup: "checkin.html" })
                                // location.href = 'checkin.html'
                            }

                            console.log(response);
                        })

                            }
                            console.log(response);
                        })
                    
                  

                };
                //Attendance API
                document.getElementById('Attendance').onclick = function () {

                    chrome.tabs.create({ url: 'http://ams.bukthost.com/' });

                };

                //Leave API
                document.getElementById('Leave').onclick = function () {

                    chrome.tabs.create({ url: 'http://ams.bukthost.com/' });

                };

                //Calendar API
                document.getElementById('Calendar').onclick = function () {
                   
                    chrome.tabs.create({ url: 'http://ams.bukthost.com/' });

                };

                //Logout to the Login the page
                document.getElementById('Logout').onclick = function () {
                    alert("You have been Logged Out!");
                        
                    //Also Deleting the token from the Local Storage
                        chrome.storage.sync.set({ 'token': 1 }, function () {
                            //alert(Success);

                               //Changing the Popup After Logging out
                    chrome.browserAction.setPopup({ popup: "index.html" })
                    location.href = 'index.html'

                        });


                 
                
                   

                };
            });
        });

    });

}
