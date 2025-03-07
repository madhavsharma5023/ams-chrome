window.onload = function () {
    //Getting the Token i.e Saved After Login

    chrome.storage.sync.get('token', function (data) {
        chrome.storage.sync.get('tok_exp', function (data2) {
            chrome.storage.sync.get('Pasted_url', function (data3) {

                var new_url = data.Pasted_url;
                new_url += "/api/auth/login"
                //var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                var proxyUrl = '';
                var att_url2 = data3.Pasted_url;
                att_url2 += "/api/auth/get-notifications"

                //AMS Api for checking the time
                //get method here
                fetch(proxyUrl + att_url2, {
                    method: 'post',

                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                    // body:formData,


                })
                    .then(function (response) {
                        return response.json();

                    }).then(function (response) {
                        //alert(response.checkin)
                        if (response.notificationsText != '') {
                            $("#notificationsText").html(response.notificationsText);
                        }
                        console.log(response);
                        $(document).ready(function () {
                            $(".media-body a").wrap("<div class='container'></div>");
                              $('.media-body .container').after('<hr>');
                              var $span = $(".media-body span.text-muted.float-right");
                              $span.replaceWith(function () {
                                  return $('<div/>', {
                                      class: 'date-field',
                                      html: this.innerHTML
                                  });
                              });
                            var $span = $(".media-body span.text-muted");
                         // Replace all the span's with a div
                            $span.replaceWith(function () {
                                return $('<div/>', {
                                    class: 'text-muted',
                                    html: this.innerHTML
                                });
                            });
                            var $span = $(".media-body span.font-weight-semibold");
                        
                            // Replace all the span's with a div
                            $span.replaceWith(function () {
                                return $('<div/>', {
                                    class: 'font-weight-semibold',
                                    html: this.innerHTML
                                });
                            });
                            $('.text-muted').addClass('b');
                    
                        $('.date-field').each(function (index, element) {
                           var date= $(this).text();
                           var date1=date.split(' ')[0];
                           var time=date.substring(date.indexOf(' ') + 1);
                           var date2= moment(date1, 'DD/MM/YYYY');
                         var date2=date2.format('MM/DD/YYYY')
                         var date2= moment(date2).format("Do MMMM, YYYY");
                        $(this).html(date2 +' '+'at'+' '+ time);
                        });
                            $(".text-muted:contains('absent')").append('<div class="row" style="margin-top:62px;position:relative;"><div class="col"><a class="btn btn-light" href="requestattendance.html"style="font-size: 14px">Request Attendance</a></div><div class="col"> <a class="btn btn-light" href="#" style="font-size: 14px">Request Leave</a></div></div>');
                            $(".text-muted:contains('absent')").removeClass('b');
                            $(".text-muted:contains('absent')").addClass('text');
                            $(".text-muted:contains('missed')").removeClass('b');
                            $(".text-muted:contains('missed')").addClass('red-text');                         
                        
                    });
                    
                    
                    })
                //Making Functions for the Buttons

                document.getElementById('mark_all_as_read').onclick = function () {
                    var proxyUrl = '';
                    var att_url2 = data3.Pasted_url;
                    att_url2 += "/api/auth/markAllAsRead"

                    //AMS Api for checking the time
                    //get method here
                    fetch(proxyUrl + att_url2, {

                        headers: {
                            'Authorization': 'Bearer ' + data.token
                        }
                        // body:formData,


                    })
                        .then(function (response) {
                            return response.json();

                        }).then(function (response) {
                            //alert(response.checkin)
                            //alert(response.message);
                            chrome.browserAction.setBadgeText({ text: '' });
                            if(response.checkout != ''){
                                 document.getElementById('checkouttime').value = response.checkout;
                            }
                            window.location.href = 'notification.html'
                            console.log(response);
                        })
                };

                //Logout
                /* document.getElementById('Logout').onclick = function () {
                      //alert("You have been Logged Out Succesfully!");
                            //Also Deleting the token from the Local Storage
                            chrome.storage.sync.set({ 'token': 1 }, function () {
                              //alert(Success);
                       
                              //Changing the Popup After Logging out
                      chrome.browserAction.setPopup({ popup: "index.html" })
                      location.href = 'index.html'
  
      
                          });
                  };*/

            });
        });

    });

}

 


