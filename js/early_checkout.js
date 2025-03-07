window.onload = function() {
    //Getting the Token i.e Saved After Login
    chrome.storage.sync.get('token', function(data) {
        chrome.storage.sync.get('tok_exp', function(data2) {
            chrome.storage.sync.get('Pasted_url', function(data3) {
                chrome.storage.sync.get('shiftEndTime', function(data4) {
                    console.log(data4)
                    if (data4['shiftEndTime']) {
                        $('#shifttime').text('Shift End Time: ' + data4.shiftEndTime);
                    }
                    var new_url = data.Pasted_url;
                    new_url += "/api/auth/login"
                    var proxyUrl = '';
                    //loaction for early checkin
                    var latitude;
                    var longitude;

                    function location() {

                        location.href = 'checkin.html'
                        const success = (position) => {
                            console.log(position)
                            latitude = position.coords.latitude;
                            console.log(latitude)
                            longitude = position.coords.longitude;
                            const geoApiurl = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}slocalityLanguage=en'
                            fetch(geoApiurl)
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                    var latutude = data.latitude;
                                    var longitude = data.longitude;

                                })


                        }
                        const error = (error) => {


                        }

                        navigator.geolocation.getCurrentPosition(success, error);



                    }
                    location();
                    //Making Functions for the Buttons
                    document.getElementById('Checkin').onclick = function() {
                        event.preventDefault()
                        function showMessage(message) {
                            var existingPopup = document.querySelector(".att-popup");
                    
                            if (existingPopup) {
                                // Update the message in the existing popup
                                existingPopup.children[0].textContent = message;
                            } else {
                                // Create and append a new popup
                                var popup = document.createElement("div");
                                popup.className = "att-popup d-flex justify-content-between z-index";
                    
                                var textDiv = document.createElement("div");
                                textDiv.style.width = "100%";
                                textDiv.style.color = "white";
                                textDiv.style.textAlign = "center";
                                textDiv.style.fontSize = "15px";
                                textDiv.textContent = message;
                                popup.appendChild(textDiv);
                    
                                document.body.appendChild(popup);
                                popup.classList.add("show");
                    
                                setTimeout(function () {
                                    popup.remove();
                                }, 1500);
                            }
                        }
                        
                        var targetreason = document.getElementById('reason').value;
                        if (!targetreason.trim()) {
                            showMessage("Please enter the reason !");
                            return false;
                        } else if (targetreason.replace(/\s/g, '').length <= 10) {
                            showMessage("Reason must be grater than 10 characters !");
                            return false;
                        }

                        var att_url = data3.Pasted_url;
                        att_url += "/api/auth/markattendance"

                        let formData = new FormData();
                        formData.append('reason', targetreason);
                        formData.append('reasonTitle', 'Early Checkout');
                        formData.append('latitude', latitude);
                        formData.append('longitude', longitude);
                        //Fetching using Post Method 
                        fetch(proxyUrl + att_url, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Authorization': 'Bearer ' + data.token,
                                    // 'Content-Type': 'application/json',

                                },

                                body: formData,
                                // body: JSON.stringify(id),

                            })
                            //Getting the response (i.e Promise) from the API and converting into JSON
                            .then(function(response) {
                                return response.json();

                            })
                            .then(function(response) {

                                if (response.message == "Unauthenticated") {

                                    alert("Attendance Not Marked!")
                                } else {
                                    // alert(response.status)
                                    if (response.checkin != '') {
                                        chrome.storage.sync.set({ 'checkin': response.checkin }, function() {});

                                    }
                                    if (response.checkout != '') {
                                        var checkout = response.checkout
                                        chrome.storage.sync.set({ 'checkout': checkout }, function() {});


                                    }
                                    //alert(response.message)
                                    //alert("Attendance sent to your Manager for Approval! Thank You!")
                                    chrome.browserAction.setPopup({ popup: "checkin.html" })
                                    window.location.href = 'checkin.html'
                                }

                                console.log(response);
                            })



                    };






                    //Logout
                    document.getElementById('Logout').onclick = function() {
                        var keyToRemove = 'team';

                        // Remove the key from chrome.storage.sync
                        chrome.storage.sync.get(keyToRemove, function(result) {
                            if (result.hasOwnProperty(keyToRemove)) {
                                chrome.storage.sync.remove(keyToRemove, function() {
                                    console.log('Key removed successfully:', keyToRemove);
                                });
                            } 
                            chrome.browserAction.setPopup({ popup: "index.html" })
                            window.location.href = 'index.html'
                        });





                    };

                });
            });

        });
    });
}