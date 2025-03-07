chrome.storage.sync.get('token', function (data) {
        chrome.storage.sync.get('tok_exp', function (data2) {
            chrome.storage.sync.get('Pasted_url', function (data3) {
function fetchdata(){
             
              var new_url = data.Pasted_url;
                //new_url += "/api/auth/login"
                //var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                var proxyUrl = '';
                var att_url2 = data3.Pasted_url;
                    att_url2 += "/api/auth/send-notification"

                     //AMS Api for checking the time
                     //get method here
                    fetch(proxyUrl + att_url2, {
                        method:'get',
                        
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': 'Bearer ' + data.token,
                            'Origin': 'http://127.0.0.1:8000'
                            
                        }
                        // body:formData,


                    })
                        .then(function (response) {
                            return response.json();

                        }).then(function (response) {
                            //alert(response.checkin)

                                //if(response.status != '100'){
                                 
                            
                                  if(parseInt(response.count) > 10)
                                  {
                                      var total = "10+"; // We have 10+ unread items.

                                  }
                                  else
                                  {
                                   var total = ""+response.count;

                                  }
                                     
                                     chrome.runtime.sendMessage('', {
                                      type: 'notification',
                                      total: total,
                                      message: response.message+'',
                                      options: {
                                        title: response.msgtitle+'',
                                        message: response.message+'',
                                        iconUrl: '/icon.png',
                                        type: 'basic'
                                      }
                                    });
                                     
                               // }
                            
                            

                        })
            
                 
          }
          setInterval(fetchdata, 1 * 60 * 1000)
          });
        });
    });


