window.onload = function() {
    //Getting the Token i.e Saved After Login
    chrome.storage.sync.get('token', function(data) {
        chrome.storage.sync.get('tok_exp', function(data2) {
            chrome.storage.sync.get(['team', 'req-limit','leave-req-limit','pending-att-req','pending-leave-req','remainingCount','leaveremainingCount',
                                    'userId','latecheckin','earlycheckout','newDivHTML','permission',
                                    'attendancemarking','shiftStartTime','shiftEndTime','leave-permission','dateFormat','teamid'], function(data8) {
                chrome.storage.sync.get('weeklyattendance', function(data9) {
                    chrome.storage.sync.get('Pasted_url', function(data3) {
                        chrome.storage.sync.get('checkin', function(data4) {
                            chrome.storage.sync.get('checkout', function(data5) {
                                chrome.storage.sync.get('username', function(data6) {
                                    chrome.storage.sync.get('imageurl', function(data7) {
                                        document.getElementById("teaminsights").style.overflowX = 'hidden';
                                        console.log('checkin',data8)
                                        console.log('checkin',data8['dateFormat'])
                                        if(data8['dateFormat']){
                                            if(data8['dateFormat'] == "m/d/Y"){
                                                var month = moment().format("MMMM Do, YYYY");
                                                document.getElementById("current-month").innerHTML = month;
                                            }
                                            else if(data8['dateFormat'] == "d/m/Y"){
                                                var month = moment().format("Do MMMM , YYYY");
                                                document.getElementById("current-month").innerHTML = month;
                                            }else{
                                                var month = moment().format("YYYY , Do MMMM");
                                                document.getElementById("current-month").innerHTML = month;
                                            }
                                        }                                        //attendance marking setting for checkin and checkout
                                        if (data8['attendancemarking']) {
                                            if(data8['attendancemarking'].valUser){
                                                if(data8['attendancemarking'].valUser == '1'){
                                                    document.getElementById('Checkin').disabled = true;
                                                    document.getElementById('Checkout').disabled = true;
                                                }
                                                else if(data8['attendancemarking'].valUser == '2'){
                                                    document.getElementById('Checkout').disabled = true;

                                                   
                                                }
                                                
                                            }else if(data8['attendancemarking'].valTeam)
                                            {
                                                if(data8['attendancemarking'].valTeam == '1'){
                                                    document.getElementById('Checkin').disabled = true;
                                                    document.getElementById('Checkout').disabled = true;

                                                   
                                                }
                                                else if(data8['attendancemarking'].valTeam == '2'){
                                                    document.getElementById('Checkout').disabled = true;

                                                }
                                              
                                            }
                                            else 
                                            {
                                                if(data8['attendancemarking'].val == '1'){
                                                    document.getElementById('Checkin').disabled = true;
                                                    document.getElementById('Checkout').disabled = true;
                                                }
                                                else if(data8['attendancemarking'].val == '2'){
                                                    document.getElementById('Checkout').disabled = true;

                                                }
                                             
                                            }
                                        }

                                        //for shift in progress or not
                                        if(data4.checkin == ''){
                                            $('#shiftprogress').text('Shift status');
                                        }else if(data4.checkin != '' && data5.checkout == ''){
                                            $('#shiftprogress').text('Shift in progress');
                                        
                                        }else if(data4.checkin != '' && data5.checkout != '' ){
                                            $('#shiftprogress').text('Shift is over');

                                        }
                                       

                                        // if (data8.newDivHTML) {
                                        //     var storedHTML = result.newDivHTML;
                                    
                                        //     leaveBalanceDiv.innerHTML = storedHTML;
                                        // }

                                        //for latecheckin and checkout
                                        if (data8['latecheckin'] && data8['latecheckin'].length > 0) {
                                            document.getElementById('Checkin').classList.add('checkinoutdisable');
                                        }
                                        
                                        if (data8['earlycheckout'] && data8['earlycheckout'].length > 0) {
                                            document.getElementById('Checkout').classList.add('checkinoutdisable');
                                        }
                                        
                                        //mouse hover on team insights
                                        var element = document.getElementById('teaminsights');
                                        element.addEventListener('mouseover', function() {
                                        element.removeAttribute("style");
                                        });

                                        element.addEventListener('mouseout', function() {
                                        element.style.overflowX = 'hidden';
                                        });

                                        var new_url = data.Pasted_url;
                                        // chrome.storage.sync.get('token', function(data) {
                                        //     if (chrome.runtime.lastError) {
                                        //         console.error(chrome.runtime.lastError);
                                        //         return;
                                        //     }
                                        if (data9 && data9.weeklyattendance) {
                                            document.getElementById("weeklyoverview").innerHTML = data9.weeklyattendance;
                                        }

                                        if (data8 && data8.team ) {
                                            console.log(data8)
                                            document.getElementById("teaminsights").innerHTML = data8.team;
                                            document.getElementById("req-count").innerHTML = data8['req-limit'];
                                            document.getElementById("leave-req-count").innerHTML = data8['leave-req-limit'];
                                            if(data8.permission === true){
                                                document.getElementById("resultContainer").innerHTML = data8['pending-att-req'];
                                                if(data8['remainingCount'] != 'null'){
                                                    document.getElementById("moreContainer").innerHTML = data8['remainingCount'];
                                                }
                                                // document.getElementById("leaveresultContainer").innerHTML = data8['pending-leave-req'];
                                                // if(data8['leaveremainingCount'] != 'null'){
                                                //     document.getElementById("leavemoreContainer").innerHTML = data8['leaveremainingCount'];
                                                // }
                                            }
                                            if(data8['leave-permission'] === true){
                                                document.getElementById("leaveresultContainer").innerHTML = data8['pending-leave-req'];
                                                if(data8['leaveremainingCount'] != 'null'){
                                                    document.getElementById("leavemoreContainer").innerHTML = data8['leaveremainingCount'];
                                                }
                                            }
                                           
                                            // document.getElementById("profilePicturesContainer").innerHTML = data8['req-img'];
                                            // document.getElementById("profilePicturesContainerforleave").innerHTML = data8['req-img2'];
                                           
                                            var allSkeleton = document.querySelectorAll('.skeleton')
                                            allSkeleton.forEach(item=> {
                                                item.classList.remove('skeleton')
                                              })
                                        }





                                      //get attendance marking setting 
 
                                        var proxyUrl = '';
                                        var att_url2 = data3.Pasted_url;
                                        att_url2 += "/api/auth/attendance-marking"
                                       
                                            //AMS Api for checking the time
                                            //get method here
                                            let formData = new FormData();
                                            
                                            formData.append('requestType', "api");
                                            fetch(proxyUrl + att_url2, {
                                                method: 'post',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Authorization': 'Bearer ' + data.token
                                                },
                                                body:formData,
                    
                    
                                            })
                                                .then(function (response) {
                                                    return response.json();
                    
                                                }).then(function (response) {
                                                    console.log('attendancemarking',response)
                                                    chrome.storage.sync.set({ 'attendancemarking': response}, function() {});

                                                    if(response.valUser){
                                                        if(response.valUser == '1'){
                                                            document.getElementById('Checkin').disabled = true;
                                                            document.getElementById('Checkout').disabled = true;
                                                        }
                                                        else if(response.valUser == '2'){
                                                            document.getElementById('Checkout').disabled = true;
                                                            document.getElementById('Checkin').disabled = false;

                                                           
                                                        }else{
                                                            document.getElementById('Checkin').disabled = false;
                                                            document.getElementById('Checkout').disabled = false;

                                                        }
                                                        
                                                    }else if(response.valTeam)
                                                    {
                                                        if(response.valTeam == '1'){
                                                            document.getElementById('Checkin').disabled = true;
                                                            document.getElementById('Checkout').disabled = true;

                                                           
                                                        }
                                                        else if(response.valTeam == '2'){
                                                            document.getElementById('Checkout').disabled = true;
                                                            document.getElementById('Checkin').disabled = false;

                                                        }else{
                                                            document.getElementById('Checkin').disabled = false;
                                                            document.getElementById('Checkout').disabled = false;

                                                        }
                                                      
                                                    }
                                                    else 
                                                    {
                                                        if(response.val == '1'){
                                                            document.getElementById('Checkin').disabled = true;
                                                            document.getElementById('Checkout').disabled = true;
                                                        }
                                                        else if(response.val == '2'){
                                                            document.getElementById('Checkout').disabled = true;
                                                            document.getElementById('Checkin').disabled = false;
                                                        }else{
                                                            document.getElementById('Checkin').disabled = false;
                                                            document.getElementById('Checkout').disabled = false;

                                                        }
                                                     
                                                    }
                                                });








                                        
                                        //new_url += "/api/auth/login"
                                        // alert(data4.checkin)
                                        var url = data3.Pasted_url;
                                        var proxyUrl = '';
                                        var att_url60 = data3.Pasted_url;
                                        att_url60 += "/api/auth/homeScreenDetails";
                                        console.log('amitkumar', att_url6);
                                        fetch(proxyUrl + att_url60, {
                                                method: 'post',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Authorization': 'Bearer ' + data.token
                                                }
                                                // body:formData,

                                            })
                                            .then(function(response) {
                                                console.log('amitttttttttttt', response)
                                                return response.json();

                                            })
                                            .then(data => {
                                                console.log(data);
                                                chrome.storage.sync.set({ 'teamid': data.teamid }, function() {
                                                });
                                                if(data.dateFormat){
                                                    if(data.dateFormat == "m/d/Y"){
                                                        var month = moment().format("MMMM Do, YYYY");
                                                        document.getElementById("current-month").innerHTML = month;
                                                    }
                                                    else if(data.dateFormat == "d/m/Y"){
                                                        var month = moment().format("Do MMMM , YYYY");
                                                        document.getElementById("current-month").innerHTML = month;
                                                    }else{
                                                        var month = moment().format("YYYY , Do MMMM");
                                                        document.getElementById("current-month").innerHTML = month;
                                                    }
                                                }      
                                                chrome.storage.sync.set({ 'dateFormat': data.dateFormat }, function() {
                                                    // alert("2")
                                                });
                                                chrome.storage.sync.set({ 'shiftStartTime': data.shiftStartTime }, function() {
                                                });
                                                chrome.storage.sync.set({ 'shiftEndTime': data.shiftEndTime }, function() {
                                                });
                                                var currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }); // Get current date in "DD/MM/YYYY" format
                                                console.log(currentDate)
                                                //get the latecheckin and earlycheckout requests for current date
                                                var lateCheckinRequests = data.your_attendance_requests.filter(request => {
                                                    var parsedDate = request.requested_on.split(' ')[0]; // Assuming the date and time are separated by a space
                                                    var [day, month, year] = parsedDate.split('/');
                                                    var formattedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
                                                console.log(formattedDate)
                                                    return request.requested_for === "Late Checkin" && formattedDate === currentDate;
                                                });
                                                console.log(lateCheckinRequests);
                                                var hasLateCheckinRequests = lateCheckinRequests;
                                                if (hasLateCheckinRequests.length > 0) {
                                                    document.getElementById('Checkin').disabled = true;
                                                }
                                                else{
                                                    document.getElementById('Checkin').classList.remove('checkinoutdisable');
                                                }
                                                chrome.storage.sync.set({ 'latecheckin': lateCheckinRequests}, function() {});

                                                var earlycheckoutRequests = data.your_attendance_requests.filter(request => {
                                                    var parsedDate = request.requested_on.split(' ')[0]; // Assuming the date and time are separated by a space
                                                    var [day, month, year] = parsedDate.split('/');
                                                    var formattedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
                                                console.log(formattedDate)
                                                    return request.requested_for === "Early Checkout" && formattedDate === currentDate;
                                                });
                                                console.log(earlycheckoutRequests);
                                                var hasearlycheckoutRequests = earlycheckoutRequests;
                                                if (hasearlycheckoutRequests.length > 0) {
                                                    document.getElementById('Checkout').disabled = true;
                                                }
                                                else{
                                                    document.getElementById('Checkout').classList.remove('checkinoutdisable');
                                                }
                                                chrome.storage.sync.set({ 'earlycheckout': earlycheckoutRequests}, function() {});

                                                //get the userid
                                                chrome.storage.sync.set({ 'userId': data.user_id}, function() {});

                                                var teamdetails='';
                                                chrome.storage.sync.set({ 'permission': data.attendance_permissions.includes(true)}, function() {
                                                    console.log('Data stored');

                                                }); 
                                                chrome.storage.sync.set({ 'leave-permission': data.leave_permissions.includes(true) }, function() {
                                                    console.log('Data stored');

                                                }); 
                                                if (data.attendance_permissions.includes(true)) {
                                                    var att_limit = data.others_attendance_requests_count + data.your_attendance_requests.length;
                                                    // var leave_limit = data.others_leave_requests_count + data.your_leave_requests.length;
                                                     //for attendance request
                                                    var dataArray = data.others_attendance_requests;
                                                    var mydataArray = data.your_attendance_requests;
                                                    var combinedArray = mydataArray.concat(dataArray); // Concatenate the arrays

                                                    console.log('shashav',combinedArray)
                                                    var innerHTML = '';
                                                    var moreContainer = document.getElementById('moreContainer');

                                                    if (combinedArray.length > 0) {
                                                        // var totalImages = dataArray.length;
                                                       
                                                        for (let i = 0; i <4; i++) {
                                                          if (combinedArray[i] && combinedArray[i].user) {

                                                            var userdetail = combinedArray[i].user;
                                                            // console.log('10-1',username)
                                                            var username = userdetail.name.charAt(0) + userdetail.lastName.charAt(0);
                                       
                                                            if (i === 3) {
                                                                innerHTML += `<div style="margin-left:2px; margin-top:2px; color:black;">${userdetail.name}</div>`;
                                                            } else {
                                                                innerHTML += `<div class="rounded-div">${username}</div>`;
                                                            }
                                                           
                                                          }
                                                          document.getElementById("resultContainer").innerHTML = innerHTML;

                                                        }
                                                    
                                                        if (att_limit > 4) {
                                                            var remainingCount = att_limit - 4;
                                                            moreContainer.textContent = '+'+ remainingCount + ' more ';
                                                            chrome.storage.sync.set({ 'remainingCount': moreContainer.textContent }, function() {
                                                                console.log('Data stored');
        
                                                            });
                                                        }
                                                        else{
                                                            chrome.storage.sync.set({ 'remainingCount': 'null' }, function() {
                                                                console.log('Data stored');
        
                                                            });
                                                        }
                                                       
                                                    } else {
                                                        innerHTML = 'No pending requests.';
                                                        document.getElementById("resultContainer").innerHTML = innerHTML;
                                                        moreContainer.textContent='';
                                                        chrome.storage.sync.set({ 'remainingCount': moreContainer.textContent }, function() {
                                                            console.log('Data stored');
    
                                                        });

                                                    }
                                                    chrome.storage.sync.set({ 'pending-att-req': innerHTML}, function() {
                                                        console.log('Data stored');

                                                    });
                                                    
                                                    // //for leave request
                                                    // var other_leave_req = data.others_leave_requests;
                                                    // var your_leave_req = data.your_leave_requests;
                                                    // var combinedleaveArray = your_leave_req.concat(other_leave_req);
                                                    // console.log('jas',combinedleaveArray)
                                                    // // console.log(dataArray2)
                                                    // // var container2 = document.getElementById('profilePicturesContainerforleave');
                                                    // var innerHTML2 = '';
                                                    // var leavemoreContainer = document.getElementById('leavemoreContainer');

                                                    // if (combinedleaveArray.length > 0) {
                                                    //     // var totalImages = dataArray.length;
                                                       
                                                    //     for (let i = 0; i <4; i++) {
                                                    //       if (combinedleaveArray[i] && combinedleaveArray[i].user) {

                                                    //         var userdetail = combinedleaveArray[i].user;
                                                    //         // console.log('10-1',username)
                                                    //         var username = userdetail.name.charAt(0) + userdetail.lastName.charAt(0);
                                   
                                                    //         if (i === 3) {
                                                    //             innerHTML2 += `<div style="margin-left:2px; margin-top:2px; color:black;">${userdetail.name}</div>`;
                                                    //         } else {
                                                    //             innerHTML2 += `<div class="rounded-div">${username}</div>`;
                                                    //         }
                                                           
                                                    //       }
                                                    //       document.getElementById("leaveresultContainer").innerHTML = innerHTML2;

                                                    //     }
                                                    
                                                    //     if (leave_limit > 4) {
                                                    //         var remainingCount = leave_limit - 4;
                                                    //         leavemoreContainer.textContent = '+'+ remainingCount + ' more ';
                                                    //         chrome.storage.sync.set({ 'leaveremainingCount': leavemoreContainer.textContent }, function() {
                                                    //             console.log('Data stored');
        
                                                    //         });
                                                    //     }
                                                    //     else{
                                                    //         chrome.storage.sync.set({ 'leaveremainingCount': 'null' }, function() {
                                                    //             console.log('Data stored');
        
                                                    //         });
                                                    //     }
                                                        
                                                    // } else {
                                                    //     innerHTML2 = 'No pending requests.';
                                                    //     document.getElementById("leaveresultContainer").innerHTML = innerHTML2;

                                                    // }
                                                    // chrome.storage.sync.set({ 'pending-leave-req': innerHTML2}, function() {
                                                    //     console.log('Data stored');

                                                    // });
                                                }
                                                else{
                                                        var att_limit = data.your_attendance_requests.length;
                                                        // var leave_limit =data.your_leave_requests.length;
                                                }
                                                document.getElementById("req-count").innerHTML = att_limit;
                                                // document.getElementById("leave-req-count").innerHTML = leave_limit;
                                                chrome.storage.sync.set({ 'req-limit': att_limit}, function() {});
                                                // chrome.storage.sync.set({ 'leave-req-limit': leave_limit}, function() {});

                                                // pending leave req permission 
                                                if (data.leave_permissions.includes(true)) {
                                                    var leave_limit = data.others_leave_requests_count + data.your_leave_requests.length;

                                                    //for leave request
                                                    var other_leave_req = data.others_leave_requests;
                                                    var your_leave_req = data.your_leave_requests;
                                                    var combinedleaveArray = your_leave_req.concat(other_leave_req);
                                                    console.log('jas',combinedleaveArray)
                                                    // console.log(dataArray2)
                                                    // var container2 = document.getElementById('profilePicturesContainerforleave');
                                                    var innerHTML2 = '';
                                                    var leavemoreContainer = document.getElementById('leavemoreContainer');

                                                    if (combinedleaveArray.length > 0) {
                                                        // var totalImages = dataArray.length;
                                                       
                                                        for (let i = 0; i <4; i++) {
                                                          if (combinedleaveArray[i] && combinedleaveArray[i].user) {

                                                            var userdetail = combinedleaveArray[i].user;
                                                            // console.log('10-1',username)
                                                            var username = userdetail.name.charAt(0) + userdetail.lastName.charAt(0);
                                   
                                                            if (i === 3) {
                                                                innerHTML2 += `<div style="margin-left:2px; margin-top:2px; color:black;">${userdetail.name}</div>`;
                                                            } else {
                                                                innerHTML2 += `<div class="rounded-div">${username}</div>`;
                                                            }
                                                           
                                                          }
                                                          document.getElementById("leaveresultContainer").innerHTML = innerHTML2;

                                                        }
                                                    
                                                        if (leave_limit > 4) {
                                                            var remainingCount = leave_limit - 4;
                                                            leavemoreContainer.textContent = '+'+ remainingCount + ' more ';
                                                            chrome.storage.sync.set({ 'leaveremainingCount': leavemoreContainer.textContent }, function() {
                                                                console.log('Data stored');
        
                                                            });
                                                        }
                                                        else{
                                                            chrome.storage.sync.set({ 'leaveremainingCount': 'null' }, function() {
                                                                console.log('Data stored');
        
                                                            });
                                                        }
                                                        
                                                    } else {
                                                        innerHTML2 = 'No pending requests.';
                                                        document.getElementById("leaveresultContainer").innerHTML = innerHTML2;
                                                        leavemoreContainer.textContent='';
                                                        chrome.storage.sync.set({ 'leaveremainingCount': leavemoreContainer.textContent }, function() {
                                                            console.log('Data stored');
    
                                                        });
                                                    }
                                                    chrome.storage.sync.set({ 'pending-leave-req': innerHTML2}, function() {
                                                        console.log('Data stored');

                                                    });
                                                }
                                                else{
                                                    var leave_limit =data.your_leave_requests.length;

                                                }
                                                document.getElementById("leave-req-count").innerHTML = leave_limit;
                                                chrome.storage.sync.set({ 'leave-req-limit': leave_limit}, function() {});

                                               //for leave request
                                            //    var dataArray2 = data.others_leave_requests;
                                            //     var container = document.getElementById('profilePicturesContainerforleave');
                                            //     var more2 = "+ "+ dataArray2.length +" more";
                                            //     console.log(more2)
                                            //     document.getElementById("moreContainerforleave").innerHTML = more2;
                                            //     chrome.storage.sync.set({ 'req-more2': more2}, function() {});
                                            //     if(dataArray2.length >0){
                                            //         for (let i = 0; i < 3; i++) {
                                            //             var userprofile = dataArray2[i].user.profile_pic;
                                            //             var profile_pic = '';

                                            //             // if (userprofile) {
                                            //                 profile_pic = url + '/storage/' + userprofile;
                                            //                 var img = document.createElement('img');
                                            //                 img.src = profile_pic;

                                            //                 img.style.width = '20px'; 
                                            //                 img.style.height = '20px'; 
                                            //                 img.style.borderRadius = '30px';
                                            //                 container.appendChild(img);

                                            //             // }
                                            //         }
                                            //         var more2 = "+ "+ dataArray2.length +" more";
                                            //         console.log(more2)
                                            //         document.getElementById("moreContainerforleave").innerHTML = more2;

                                            //     }   
                                                // console.log('madhavsharmaaaaaaaaa', data.attendance_permissions[0]);
                                                // console.log('madhavsharmaaaaaaaaa', data.attendance_permissions[0]==true);
                                                // console.log('madhavsharmaaaaaaaaa', data.teamStatus);
                                            if (data.attendance_permissions[0]=== true) {
                                                    // document.getElementById("teaminsights").classList.add("scrollmenu");
                                                    var data = data.teamStatus;
                                                    var teamdetails = '';

                                                    // Define the desired order of keys
                                                    var keyOrder = ['totalEmployees', 'totalPresent', 'usersOnLeaveCount', 'usersOnWeekendCount', 'lateCheckinCount', 'earlyCheckoutCount','noCheckinUsersCount'];

                                                    // Loop through keys in the desired order
                                                    keyOrder.forEach(function (key) {
                                                        if (key in data) {
                                                            var modifiedKey;
                                                            if (key === 'totalEmployees') {
                                                                modifiedKey = 'Total';
                                                            } else if (key === 'totalPresent') {
                                                                modifiedKey = 'Available';
                                                            } else if (key === 'usersOnWeekendCount') {
                                                                modifiedKey = 'Weekly Off';
                                                            } else if (key === 'usersOnLeaveCount') {
                                                                modifiedKey = 'On Leave';
                                                            } else if (key === 'lateCheckinCount') {
                                                                modifiedKey = 'Late Check-in';
                                                            } else if (key === 'noCheckinUsersCount') {
                                                                modifiedKey = 'No Check-in';
                                                            } else if (key === 'earlyCheckoutCount') {
                                                                modifiedKey = 'Early Check-out';
                                                            } else {
                                                                modifiedKey = key;
                                                            }

                                                            console.log(`${modifiedKey}: ${data[key]}`);
                                                            var isClickable = modifiedKey !== 'Total';
                                                            teamdetails += `
                                                                <a href="${isClickable ? 'teamdetails.html?id=' + modifiedKey : '#'}" id="team-availableUsers" >
                                                                    <div id="availableUsers" style="color: #2B55B7;font-weight: 600;font-size: 28px;">${data[key]}</div>
                                                                    <div class="teamname">${modifiedKey}</div>
                                                                </a>
                                                            `;
                                                        }
                                                    });
                                            }
                                            else{
                                                var data=data.teamStatus;
                                                    var keyOrder = ['totalEmployees', 'totalPresent', 'usersOnLeaveCount', 'usersOnWeekendCount'];

                                                    keyOrder.forEach(function (key) {
                                                        if (key in data) {
                                                            var modifiedKey;
                                                    
                                                            if (key === 'totalEmployees') {
                                                                modifiedKey = 'Total';
                                                            } else if (key === 'totalPresent') {
                                                                modifiedKey = 'Available';
                                                            } else if (key === 'usersOnWeekendCount') {
                                                                modifiedKey = 'Weekly Off';
                                                            } else if (key === 'usersOnLeaveCount') {
                                                                modifiedKey = 'On Leave';
                                                            } else {
                                                                modifiedKey = key;
                                                            }
                                                    
                                                            console.log(`${modifiedKey}: ${data[key]}`);
                                                            var isClickable = modifiedKey !== 'Total';
                                                            teamdetails += `
                                                                <a href="${isClickable ? 'teamdetails.html?id=' + modifiedKey : '#'}" id="team-availableUsers">
                                                                    <div id="availableUsers" style="color: #2B55B7;font-weight: 600;font-size: 28px;">${data[key]}</div>
                                                                    <div class="teamname">${modifiedKey}</div>
                                                                </a>
                                                            `;
                                                        }
                                                    });


                                            }
                                            //    console.log(teamdetails)
                                               document.getElementById("teaminsights").innerHTML = teamdetails;
                                               chrome.storage.sync.set({ 'team': teamdetails }, function() {});
                                               var allSkeleton = document.querySelectorAll('.skeleton')
                                               allSkeleton.forEach(item=> {
                                                   item.classList.remove('skeleton')
                                                 })

                                            })
         //team insights api...........................................
                                        var att_url6 = data3.Pasted_url;
                                        att_url6 += "/api/auth/teamDetails";
                                        console.log('amit', att_url6);
                                        fetch(proxyUrl + att_url6, {
                                                method: 'get',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Authorization': 'Bearer ' + data.token
                                                }
                                                // body:formData,

                                            })
                                            .then(function(response) {
                                                alert();
                                                console.log('amit', response)
                                                return response.json();

                                            })
                                            .then(data => {
                                                // console.log('madhavsharmaa', data);
                                                // chrome.storage.sync.set({ 'team': data }, function() {});

                                                // document.getElementById("totalEmployees").innerHTML = data.totalEmployees;
                                                // document.getElementById("availableUsers").innerHTML = data.totalPresent;
                                                // document.getElementById("usersOnLeave").innerHTML = data.usersOnLeaveCount;
                                                // document.getElementById("usersOnWeekendCount").innerHTML = data.usersOnWeekendCount;


                                            })

                                           





                                    //weekly overview api...................................
                                        var att_url5 = data3.Pasted_url;
                                        att_url5 += "/api/auth/weeklyOverview";
                                        // att_url5 += "/api/auth/profile";
                                        // console.log('inside', att_url5)
                                        fetch(proxyUrl + att_url5, {
                                                method: 'post',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Authorization': 'Bearer ' + data.token
                                                }
                                                // body:formData,

                                            })
                                            .then(function(response) {
                                                // console.log('madhav', response)
                                                return response.json();

                                            })
                                            .then(data => {
                                                console.log('madhavprofile', data);
                                                let iterableDateFromWeeklyOverViewResponse = [];
                                                let weeklyOverViewColors = [];
                                                let weeklyOverViewTextColors = [];
                                                if (data.status === 200) {
                                                    delete data["status"];
                                                    weeklyOverViewValues = Object.values(data);
                                                    console.log('madhav', weeklyOverViewValues)
                                                    weeklyOverViewKeys = Object.keys(data);


                                                    console.log('sharma', weeklyOverViewKeys)
                                                    for (let i = 0; i < weeklyOverViewValues.length; i++) {

                                                        iterableDateFromWeeklyOverViewResponse.push(weeklyOverViewKeys[i].split("-"));

                                                        switch (weeklyOverViewValues[i]) {
                                                            case "A":
                                                                weeklyOverViewColors.push('#fba89d');
                                                                weeklyOverViewTextColors.push('#a01f1f');
                                                                break;
                                                            case "P":
                                                                // alert("2")
                                                                weeklyOverViewColors.push('#a6e49c');
                                                                weeklyOverViewTextColors.push('#189903');
                                                                break;
                                                            case "H":
                                                                // alert("3")
                                                                weeklyOverViewColors.push('#8cabdd');
                                                                weeklyOverViewTextColors.push('#214cae');
                                                                break;
                                                            case "L":
                                                                // alert("4")
                                                                weeklyOverViewColors.push('#FDF4DC');
                                                                weeklyOverViewTextColors.push('#D9822F');
                                                                break;
                                                            case "IN":
                                                                weeklyOverViewColors.push('#cccccc');
                                                                weeklyOverViewTextColors.push('#484848');
                                                                break;
                                                        }
                                                    }
                                                    var weeks = [];
                                                    let days = { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 7: 'Sun' };
                                                    let ob = new Date();
                                                    let ob1 = ob.getDay();
                                                    for (let i = 0; i <= 4; i++) {
                                                        if (ob1 != 0) {
                                                            weeks.push(days[ob1]);
                                                            ob1 = ob1 - 1;

                                                        } else if (ob1 == 0) {
                                                            ob1 = 7;
                                                            weeks.push(days[ob1]);
                                                            ob1=ob1-1;
                                                        }
                                                    }
                                                    console.log('shubham', weeks)

                                                    // let weeks = [];
                                                    let weeklyOverviewHTML = "";
                                                    for (let i = iterableDateFromWeeklyOverViewResponse.length - 1; i >= 0; i--) {
                                                        var dateParts = iterableDateFromWeeklyOverViewResponse[i];
                                                        var dayName = weeks[i];
                                                        var statusColor = weeklyOverViewColors[i];
                                                        var textColor = weeklyOverViewTextColors[i];

                                                        weeklyOverviewHTML += `<div class='day-box skelten' style='background-color: ${statusColor}; color: ${textColor}; padding-top: 4px;'>
                                                                            <div class='date-box skelten'>${dateParts[2]}</div>
                                                                            <div class='day-name-box skelten'>${dayName}</div>
                                                                            </div>`;
                                                        chrome.storage.sync.set({ 'weeklyattendance': weeklyOverviewHTML }, function() {});

                                                    }
                                                    document.getElementById("weeklyoverview").innerHTML = weeklyOverviewHTML;
                                                    // var allSkeleton = document.querySelectorAll('.skeleton')
                                                    // allSkeleton.forEach(item=> {
                                                    //     item.classList.remove('skeleton')
                                                    //   })
                                                }
                                            })






                                        $('#username').text(' ' + data6.username);
                                        console.log("11111",data7)
                                        document.getElementById("profile").src = data7.imageurl;
                                        const checkinDateString = data4.checkin;
                                        const checkoutDateString = data5.checkout;
                                        // Function to format date string to time string
                                        const formatTimeString = (dateString) => {
                                            if (dateString) {
                                                if(dateString.split(' ')[2] == undefined)
                                                {
                                                    var timeString = dateString.split(' ')[1];
                                                }
                                                else{
                                                    var timeString = dateString.split(' ')[1] + ' ' + dateString.split(' ')[2];
                                                }
                                                return timeString;
                                            }
                                            return dateString;
                                        };
                                        // Set check-in time
                                        const checkinTime = formatTimeString(checkinDateString);
                                        document.getElementById('checkintime').value = checkinTime;
                                        // Set check-out time
                                        const checkoutTime = formatTimeString(checkoutDateString);
                                        console.log("out2",checkoutTime)
                                        document.getElementById('checkouttime').value = checkoutTime;
                                        if (checkoutTime) {
                                            document.getElementById('timehrs').style.display = "none";

                                            var checkinTime2 = new Date('January 1, 2023 ' + checkinTime);
                                            var checkoutTime2 = new Date('January 1, 2023 ' + checkoutTime);
                                            var timeDifference = checkoutTime2 - checkinTime2;

                                            // Calculate hours and minutes
                                            var hours = Math.floor(timeDifference / 3600000);
                                            var minutes = Math.floor((timeDifference % 3600000) / 60000);

                                            // Display an alert with the time difference
                                            var differenceElement = document.getElementById('timedifference');
                                            differenceElement.innerHTML = hours + 'hrs' + minutes + 'min';
                                        }
                                        var intime = document.getElementById('checkintime').value;
                                        var outtime = document.getElementById('checkouttime').value;
                                        console.log("out3",outtime)
                                        if (intime != '') {
                                            document.getElementById("Checkin").disabled = true;
                                            document.getElementById('Checkin').style.display = "none";
                                        }
                                        if (outtime != '') {
                                            document.getElementById("Checkout").disabled = true;
                                            document.getElementById("Checkout").style.display = "none";
                                        }
                                        if (intime == '' && outtime == '') {
                                            document.getElementById('checkouttime').style.display = "none";
                                            document.getElementById('checkintime').style.display = "none";
                                            document.getElementById('Checkin').style
                                                .cssText = "color:#ffff;background-color:rgb(51, 103, 214)";
                                        }
                                        if (intime == '') {
                                            //    document.getElementById('checkinttime').style.display="none";
                                            //   document.getElementById('Checkin').style
                                            //   .cssText = "color:#ffff!important;background-color:rgb(51, 103, 214)!important";

                                        }
                                        if (outtime == '') {
                                            document.getElementById('Checkout').style
                                                .cssText = "color:#ffff!important;background-color:rgb(51, 103, 214)!important";
                                            document.getElementById('checkouttime').style.display = "none";
                                        }

                                        var att_url2 = data3.Pasted_url;
                                        att_url2 += "/api/auth/sendnotification";

                                        //AMS Api for checking the time
                                        //get method here
                                        fetch(proxyUrl + att_url2, {
                                                method: 'get',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Authorization': 'Bearer ' + data.token
                                                }
                                                // body:formData,


                                            })
                                            .then(function(response) {
                                                return response.json();

                                            }).then(function(response) {
                                                //alert(response.checkin)
                                                //if(response.status != '100'){
                                                var total = response.count;

                                                if (parseInt(response.count) > 10) {
                                                    total = "10+"; // We have 10+ unread items.

                                                } else {
                                                    total = total.toString(); // We have 10+ unread items.

                                                }
                                                var title1 = response.msgtitle;
                                                var message = response.message;
                                                chrome.runtime.sendMessage('', {
                                                    type: 'notification',
                                                    total: total,
                                                    message: message,
                                                    options: {
                                                        title: title1,
                                                        message: message,
                                                        iconUrl: '/icon.png',
                                                        type: 'basic'
                                                    }
                                                });
                                                // }

                                            });
                                        var att_url2 = data3.Pasted_url;
                                        att_url2 += "/api/auth/getcheckincheckouttimeapi"

                                        //AMS Api for checking the time
                                        //get method here
                                        fetch(proxyUrl + att_url2, {

                                                headers: {
                                                    'Authorization': 'Bearer ' + data.token
                                                }
                                                // body:formData,


                                            })
                                            .then(function(response) {
                                                return response.json();

                                            }).then(function(response) {
                                                console.log('checkin',response)
                                                //alert(response.checkin)
                                                chrome.storage.sync.set({ 'checkin': response.checkin }, function() {});
                                                chrome.storage.sync.set({ 'checkout': response.checkout }, function() {});
                                                chrome.storage.sync.set({ 'username': response.username }, function() {});
                                                chrome.storage.sync.set({ 'imageurl': response.imageurl }, function() {});
                                                $('#username').text(' ' + response.username);
                                                document.getElementById("profile").src = response.imageurl;
                                                if (response.checkin !== '') {
                                                    const dateString = response.checkin;
                                                    if(dateString.split(' ')[2] == undefined)
                                                    {
                                                        var timeString = dateString.split(' ')[1];
                                                    }
                                                    else{
                                                        var timeString = dateString.split(' ')[1] + ' ' + dateString.split(' ')[2];
                                                    }
                                                    // const timeString = dateString.split(' ')[1] + ' ' + dateString.split(' ')[2];
                                                    document.getElementById('checkintime').value = timeString;
                                                    document.getElementById("Checkin").disabled = true;
                                                    document.getElementById('checkintime').style.display = "block";
                                                    document.getElementById('Checkin').style.display = "none";
                                                } else {
                                                    // document.getElementById("Checkin").disabled = false;
                                                    document.getElementById('checkintime').value = '';
                                                }
                                                if (response.checkout !== '') {
                                                    const dateString2 = response.checkout;
                                                    const timeString2 = dateString2.split(' ')[1] + ' ' + dateString2.split(' ')[2];
                                                    document.getElementById('checkouttime').value = timeString2;
                                                    document.getElementById("Checkout").disabled = true;
                                                    document.getElementById("Checkout").style.display = "none";
                                                    document.getElementById("timehrs").style.display = "none";
                                                    const dateString = response.checkin;
                                                    const timeString = dateString.split(' ')[1] + ' ' + dateString.split(' ')[2];
                                                    var checkinTime = new Date('January 1, 2023 ' + timeString);
                                                    var checkoutTime = new Date('January 1, 2023 ' + timeString2);
                                                    var timeDifference = checkoutTime - checkinTime;

                                                    // Calculate hours and minutes
                                                    var hours = Math.floor(timeDifference / 3600000);
                                                    var minutes = Math.floor((timeDifference % 3600000) / 60000);

                                                    var differenceElement = document.getElementById('timedifference');
                                                    differenceElement.innerHTML = hours + 'hrs' + minutes + 'min';
                                                } else {
                                                    document.getElementById('checkouttime').value = '';
                                                    // document.getElementById("Checkout").disabled = false;
                                                }


                                                console.log(response);
                                            })

                                        //.......................//
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
                                                        const latutude = data.latitude;
                                                        const longitude = data.longitude;

                                                    })


                                            }
                                            const error = (error) => {


                                            }

                                            navigator.geolocation.getCurrentPosition(success, error);



                                        }
                                       
                                        //Making Functions for the Buttons
                                        document.getElementById('Checkin').onclick = function() {
                                            if(data8['teamid']){
                                            var teamid = data8.teamid;                                          
                                            }
                                            if(data8['userId']){
                                            var userid = data8.userId;                                          
                                            }
                                            // document.getElementById("Checkin").disabled = true;
                                            $(this).append('<div class="loader-overlay"><div class="loader"></div></div>');

                                            location();
                                            event.preventDefault()

                                            var att_url = data3.Pasted_url;
                                            att_url += "/api/auth/markattendance";

                                            var att_url2 = data3.Pasted_url;
                                            att_url2 += "/api/auth/checkinCheckout";
                                            var att_url3 = data3.Pasted_url;
                                            att_url3 += `/api/auth/checkForLateCheckinEarlyCheckout?platform=Chrome_extension&userid=${userid}&teamid=${teamid}`;
                                            fetch(proxyUrl + att_url3, {
                                                method: 'get',
                                                headers: {
                                                    'Authorization': 'Bearer ' + data.token
                                                }
                                                // body:formData,


                                            })
                                            .then(function(response) {

                                                return response.json();

                                            }).then(function(response) {

                                            console.log("latecheckin",response.message)
                                            //checking if the shift time is over
                                            if(response.message == 'Please use authorised device')
                                            {
                                                var popup = document.createElement("div");
                                                popup.className = "att-popup d-flex justify-content-between";
                                                var textDiv = document.createElement("div");
                                                textDiv.style.width = "100%";
                                                textDiv.style.color = "white";
                                                textDiv.style.textAlign = "center";
                                                textDiv.textContent = "Please use authorised device";
                                                popup.appendChild(textDiv);
                                            
                                                document.body.appendChild(popup);
                                            
                                                popup.classList.add("show");
                                            
                                                setTimeout(function () {
                                                    $('.loader-overlay').remove();
                                                    popup.remove();
                                                }, 2000);
                                            }
                                            else if (response.afterShiftTime == true) {
                                                var popup = document.createElement("div");
                                                popup.className = "att-popup d-flex justify-content-between";
                                                var textDiv = document.createElement("div");
                                                textDiv.style.width = "100%";
                                                textDiv.style.color = "white";
                                                textDiv.textContent = "Shift time is over! Please request attendance";
                                                popup.appendChild(textDiv);
                                            
                                                document.body.appendChild(popup);
                                            
                                                popup.classList.add("show");
                                            
                                                setTimeout(function () {
                                                    popup.remove();
                                                    window.location.href = "requestattendance.html";
                                                }, 2000);
                                            }else{
                                            //AMS Api for checking the time
                                            //get method here
                                            fetch(proxyUrl + att_url2, {
                                                method: 'post',
                                                headers: {
                                                    'Authorization': 'Bearer ' + data.token
                                                }
                                                // body:formData,


                                            })
                                            .then(function(response) {

                                                return response.json();

                                            }).then(function(response) {
                                                /*alert(response.checkin)
                                                    if(response.checkin){
                                                         document.getElementById('checkintime').value = response.checkin;
                                                    }*/

                                                // alert(response.status)
                                                // alert(response.earlyCheckout.message)
                                                // alert(response.lateCheckin.lateCheckin)


                                                //Checking if the user has checked in late
                                                if (response.lateCheckin.lateCheckin) {
                                                    console.log("ankit")
                                                    window.location.href = "checkin_late.html"
                                                    chrome.notifications.create('Shubham')
                                                        //alert(response.lateCheckin.lateCheckin)
                                                        //alert(response.lateCheckin.message)

                                                    //taking user to the late checkin forum
                                                    //chrome.browserAction.setPopup({ popup: "checkin_late.html" })

                                                }

                                                //if the user is checking in time then direct checkin
                                                else {
                                                    console.log("not ankit");
                                                    //Fetching using Post Method
                                                    fetch(proxyUrl + att_url, {
                                                            method: 'POST',
                                                            headers: {
                                                                'Accept': 'application/json',
                                                                'Authorization': 'Bearer ' + data.token,
                                                                'Content-Type': 'application/json',

                                                            },
                                                            body: JSON.stringify({
                                                                latitude: latitude,
                                                                longitude: longitude,
                                                            }),
                                                        })
                                                        //Getting the response (i.e Promise) from the API and converting into JSON
                                                        .then(function(response) {
                                                            return response.json();

                                                        })
                                                        .then(function(response) {

                                                            if (response.message == "Unauthenticated.") {

                                                                alert("Attendance Not Marked!")
                                                            } else {
                                                                // alert(response.status)
                                                                //alert(response.message)
                                                                if (response.checkin != '') {
                                                                    // alert("2")
                                                                    chrome.storage.sync.set({ 'checkin': response.checkin }, function() {});
                                                                    const dateString = response.checkin;
                                                                    // alert(data4.checkin)
                                                                    const timeString = dateString.split(' ')[1] + ' ' + dateString.split(' ')[2];
                                                                    document.getElementById('checkintime').value = timeString;
                                                                    document.getElementById("Checkin").disabled = true;
                                                                    document.getElementById('checkintime').style.display = "block";
                                                                    document.getElementById('Checkin').style.display = "none";
                                                                }
                                                                if (response.checkout != '') {
                                                                    // alert("1")
                                                                    chrome.storage.sync.set({ 'checkout': response.checkout }, function() {});
                                                                    document.getElementById('checkouttime').value = response.checkout;
                                                                    document.getElementById("Checkout").disabled = true;
                                                                }
                                                                // alert("Checked In!")
                                                                // chrome.browserAction.setPopup({ popup: "checkout.html" })
                                                                // window.location.href = 'checkout.html'
                                                            }

                                                            console.log(response);
                                                        })
                                                }


                                                console.log(response);
                                            })}

                                            });
                                           

                                        };

                                        document.getElementById("decline-buttons").addEventListener("click", function (event) {
                                            document.getElementById("myModal").style.display = "none";
                                        });
                                        //Making Functions for the Buttons
                                        document.getElementById('Checkout').onclick = function() {
                                           
                                            location();
                                            event.preventDefault()
                                            if(data8['teamid']){
                                                var teamid = data8.teamid;                                          
                                            }
                                            if(data8['userId']){
                                                var userid = data8.userId;                                          
                                            }
                                            var intime = document.getElementById('checkintime').value;
                                       
                                            if (intime == '') {
                                                document.getElementById("myModal").style.display = "block";
                                                return;
                                            }

                                            var thisloader = this;
                                            $(thisloader).append('<div class="loader-overlay"><div class="loader"></div></div>');
                                            document.getElementById("Checkout").disabled = true;
                                            var att_url = data3.Pasted_url;
                                            att_url += "/api/auth/markattendance"
                                            var att_url2 = data3.Pasted_url;
                                            att_url2 += "/api/auth/checkinCheckout"
                                            var att_url3 = data3.Pasted_url;
                                            att_url3 += `/api/auth/checkForLateCheckinEarlyCheckout?platform=Chrome_extension&userid=${userid}&teamid=${teamid}`;
                                            fetch(proxyUrl + att_url3, {
                                                method: 'get',
                                                headers: {
                                                    'Authorization': 'Bearer ' + data.token
                                                }
                                                // body:formData,


                                            })
                                            .then(function(response) {

                                                return response.json();

                                            }).then(function(response) {

                                            console.log("earlycheckout",response)
                                            if(response.message == 'Please use authorised device')
                                            {
                                                var popup = document.createElement("div");
                                                popup.className = "att-popup d-flex justify-content-between";
                                                var textDiv = document.createElement("div");
                                                textDiv.style.width = "100%";
                                                textDiv.style.color = "white";
                                                textDiv.style.textAlign = "center";
                                                textDiv.textContent = "Please use authorised device";
                                                popup.appendChild(textDiv);
                                            
                                                document.body.appendChild(popup);
                                            
                                                popup.classList.add("show");
                                            
                                                setTimeout(function () {
                                                    $('.loader-overlay').remove();
                                                    popup.remove();
                                                }, 2000);
                                            }else if(response.earlyCheckoutTime === false){
                                                var popup = document.createElement("div");
                                                popup.className = "att-popup d-flex justify-content-between";            
                                                var textDiv = document.createElement("div");
                                                textDiv.style.width = "100%";
                                                textDiv.style.color = "white";
                                                textDiv.style.textAlign = "center";
                                                textDiv.textContent = "Shift has not started yet.";
                                                popup.appendChild(textDiv);
                                            
                                                document.body.appendChild(popup);
                                            
                                                popup.classList.add("show");
                                            
                                                setTimeout(function () {
                                                    popup.remove();
                                                    $('.loader-overlay').remove();
                                                    document.getElementById("Checkout").disabled = false;
                                                }, 2000);     
                                            }else{
                                                //AMS Api for checking the time
                                                fetch(proxyUrl + att_url2, {

                                                    method: 'POST',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Authorization': 'Bearer ' + data.token,
                                                        // 'Content-Type': 'application/json',

                                                    },
                                                    // body:formData,


                                                })
                                                .then(function(response) {
                                                    return response.json();

                                                }).then(function(response) {

                                                    // alert(response.status)
                                                    // alert(response.earlyCheckout.message)
                                                    // alert(response.earlyCheckout.earlyCheckout)

                                                    if (response.earlyCheckout.earlyCheckout) {
                                                        // alert(response.lateCheckin.lateCheckin)
                                                        //alert(response.earlyCheckout.message)

                                                        //taking user to the late checkin forum
                                                        // chrome.browserAction.setPopup({ popup: "early_checkout.html" })
                                                        window.location.href = 'early_checkout.html'
                                                    } else {
                                                        //Fetching using Post Method
                                                        fetch(proxyUrl + att_url, {
                                                                method: 'POST',
                                                                headers: {
                                                                    'Accept': 'application/json',
                                                                    'Authorization': 'Bearer ' + data.token,
                                                                    'Content-Type': 'application/json',

                                                                },
                                                                body: JSON.stringify({
                                                                    latitude: latitude,
                                                                    longitude: longitude,
                                                                }),
                                                            })
                                                            .then(function(response) {
                                                                return response.json();

                                                            })
                                                            .then(function(response) {

                                                                if (response.message == "Unauthenticated.") {

                                                                    alert("Attendance Not Marked!")
                                                                } else {
                                                                    // alert(response.status)
                                                                    // alert(response.message)
                                                                    if (response.checkin != '') {
                                                                        chrome.storage.sync.set({ 'checkin': response.checkin }, function() {});
                                                                        const dateString = response.checkin;
                                                                        // alert("checkout")
                                                                        const timeString = dateString.split(' ')[1] + ' ' + dateString.split(' ')[2];
                                                                        document.getElementById('checkintime').value = timeString;
                                                                        document.getElementById("Checkin").disabled = true;
                                                                        document.getElementById('checkintime').style.display = "block";
                                                                        document.getElementById('Checkin').style.display = "none";
                                                                    }
                                                                    if (response.checkout != '') {
                                                                        // alert("checkout---2")
                                                                        chrome.storage.sync.set({ 'checkout': response.checkout }, function() {});
                                                                        const dateString2 = response.checkout;

                                                                        const timeString2 = dateString2.split(' ')[1] + ' ' + dateString2.split(' ')[2];
                                                                        document.getElementById('checkouttime').value = timeString2;
                                                                        document.getElementById("Checkout").disabled = true;
                                                                        document.getElementById('checkouttime').style.display = "block";
                                                                        document.getElementById('Checkout').style.display = "none";
                                                                        document.getElementById('timehrs').style.display = "none";
                                                                        const dateString = response.checkin;
                                                                        const timeString = dateString.split(' ')[1] + ' ' + dateString.split(' ')[2];
                                                                        var checkinTime = new Date('January 1, 2023 ' + timeString);
                                                                        var checkoutTime = new Date('January 1, 2023 ' + timeString2);
                                                                        var timeDifference = checkoutTime - checkinTime;

                                                                        // Calculate hours and minutes
                                                                        var hours = Math.floor(timeDifference / 3600000);
                                                                        var minutes = Math.floor((timeDifference % 3600000) / 60000);

                                                                        // Display an alert with the time difference
                                                                        var differenceElement = document.getElementById('timedifference');
                                                                        differenceElement.innerHTML = hours + 'hrs' + minutes + 'min';
                                                                    }

                                                                }

                                                                console.log(response);
                                                            })

                                                    }
                                                    console.log(response);
                                                })
                                            }
                                        });
                                            


                                        };

                                        var att_url2 = data3.Pasted_url;
                                        //Attendance API diverting to AMS BuktHost
                                        // document.getElementById('Attendance').onclick = function() {

                                        //     chrome.tabs.create({ url: att_url2 + '/request-attendance' });

                                        // };

                                        //Leave API
                                        // document.getElementById('Leave').onclick = function() {

                                        //     chrome.tabs.create({ url: att_url2 + '/apply-leave/create' });

                                        // };

                                        // //Calendar API
                                        // document.getElementById('Calendar').onclick = function() {

                                        //     chrome.tabs.create({ url: att_url2 + '/holidaycalendar' });

                                        // };


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
                    });
                });
            });
        });
    });


    // });
    var day = moment().format("dddd,");
    // var month = moment().format("Do MMMM, YYYY");
    var time = moment().format("h:mm");
    var ampm = moment().format("A");
    document.getElementById("current-day").innerHTML = day;
    // document.getElementById("current-month").innerHTML = month;
    document.getElementById("current-time").innerHTML = time;
    document.getElementById("current-format").innerHTML = ampm;
}