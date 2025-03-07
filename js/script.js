$(document).ready(function() {
    $("#form").submit(function(event) {

        // alert("inside")
        event.preventDefault();
        //Fetching the Fetails from the From and posting them to bukthost via API
        var email = $("#email").val();
        var password = $("#password").val();
        var remember_me = 0;

        // Getting the Organization's Url Here
        chrome.storage.sync.get("Pasted_url", function(data) {
            var new_url = data.Pasted_url;
            new_url += "/api/auth/login";
            console.log(new_url);

            //Appending this url with the API because of CORS policy
            var proxyUrl = "";
            //var proxyUrl = '';
            //Getting the details from the form directly one at a time
            //i.e we are getting the key value pairs here
            let formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("remember_me", remember_me);

            //Fetching using Post Method
            fetch(proxyUrl + new_url, {
                    method: "POST",
                    body: formData,
                })
                //Getting the response (i.e Promise) from the API and converting into JSON
                .then(function(response) {
                    console.log(response)
                    return response.json();
                })

            .then(function(response) {
                //Emptying the Form
                //  $("#email").val("");
                //  $("#password").val("");

                //Checking the User is authorized or not
                if (response.message == "Unauthorized") {
                    $('.wrap-validate').hide();
                    $('.error-message').remove();
                    $('.input100').addClass('error');
                    $('.input100').css('border', '1px solid red');
                    $('<span class="error-message" style="color:red;">Invalid credentials!</div>').insertBefore('.container-login100-form-btn');
                    return false;
                } else {
                    //Token Received after Successful Login //    alert(response.access_token)
                    var result = response.access_token;
                    // alert(result)
                    //getting the token expires time
                    var exp = response.expires_at;
                    var checkin = response.checkin;
                    var checkout = response.checkout;
                    var shiftStartTime = response.shiftStartTime;
                    var shiftEndTime = response.shiftEndTime;
                    var username = response.username;
                    var imageurl = response.imageurl;
                    chrome.storage.sync.set({
                            tok_exp: exp,
                        },
                        function() {
                            // alert(exp);
                        }
                    );
                    chrome.storage.sync.set({
                            checkout: checkout,
                        },
                        function() {
                            // alert(exp);
                        }
                    );
                    chrome.storage.sync.set({
                            checkin: checkin,
                        },
                        function() {
                            // alert(exp);
                        }
                    );
                    chrome.storage.sync.set({
                            shiftStartTime: shiftStartTime,
                        },
                        function() {
                            // alert(exp);
                        }
                    );
                    chrome.storage.sync.set({
                            shiftEndTime: shiftEndTime,
                        },
                        function() {
                            // alert(exp);
                        }
                    );
                    chrome.storage.sync.set({
                            username: username,
                        },
                        function() {
                            // alert(exp);
                        }
                    );
                    chrome.storage.sync.set({
                            imageurl: imageurl,
                        },
                        function() {
                            // alert(exp);
                        }
                    );
                    //Here I'm saving the Token that I got from the API after LOGIN
                    //Saving that token in the local storage
                    chrome.storage.sync.set({
                            token: result,
                        },
                        function() {
                            // alert(result);
                        }
                    );

                    //alert("Successfully Logged In!")
                    // alert(response)

                    //Changing the Popup here
                    chrome.browserAction.setPopup({
                        popup: "checkin.html",
                    });
                    location.href = "checkin.html";
                }

                console.log(response);
            });
        });
    });
});