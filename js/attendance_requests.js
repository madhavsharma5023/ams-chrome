window.onload = function () {
    const originalDate = new Date('31/01/2024');
                            console.log('shashav',originalDate)

    chrome.storage.sync.get(['token', 'Pasted_url', 'checkin','attendance','permission'], function (data1) {
            var proxyUrl = '';
            var url = data1.Pasted_url;
            var att_url60 = data1.Pasted_url;

            att_url60 += "/api/auth/attendanceRequests";
            // att_url60 += "/api/auth/reports-data";
            console.log('amitkumar', att_url60);
            var permission =data1.permission ;
            console.log(permission)
            fetch(proxyUrl + att_url60, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + data1.token
                    }
                    // body:formData,

                })
                .then(function(response) {
                    console.log('amitttttttttttt', response)
                    return response.json();

                })
                .then(data => {
                    // console.log('madhavsharmaaaaaaaaa', data.attendance_permissions[0]);
                    // console.log('madhavsharmaaaaaaaaa', data.attendance_permissions[0]==true);
                    // console.log('madhavsharmaaaaaaaaa', data.teamStatus);
                    var dataArray =data.others_attendance_requests;
                    var dataArray2 =data.your_attendance_requests;
                    console.log('madhavsharma', data);
                    console.log('madhavsharma', (data1.permission));
                    let innerhtml = "";
                   

                    for (let i = 0; i < dataArray2.length; i++) {
                        var id = dataArray2[i].id;
                        var userprofile = dataArray2[i].user.profile_pic;
                        var profile_pic = '';
                        if (userprofile) {
                            profile_pic = url + '/storage/' + userprofile;
                            // console.log(profile_pic)
                        }
                        var check_in_time = dataArray2[i].check_in;
                        console.log('checkintime',check_in_time)
                        var dateTimeComponents = check_in_time.split(' ');
                        if(dateTimeComponents[2] == undefined)
                        {
                            var check_in = dateTimeComponents[1] ;
                        }
                        else{
                            var check_in = dateTimeComponents[1] + ' ' + dateTimeComponents[2];
                        }
                        console.log('checkin-time',check_in)

                        var check_out_time = dataArray2[i].check_out;
                        if(check_out_time){
                            var dateTimeComponents = check_out_time.split(' ');
                            if(dateTimeComponents[2] == undefined)
                            {
                                var check_out = dateTimeComponents[1]; 

                            }
                            else{
                                var check_out = dateTimeComponents[1] + ' ' + dateTimeComponents[2]; 

                            }
                        }
                        else{
                              var check_out =check_out_time;
                        }                      
                        var permission = dataArray2[i].editPermission;
                        console.log(permission)
                        var comments = dataArray2[i].comments;
                        var requested_for = dataArray2[i].requested_for;
                        var userName = dataArray2[i].user.name + ' '+dataArray2[i].user.lastName;
                        var inputDateString = dataArray2[i].requested_on;
                        console.log('shashav',inputDateString)

                        var originalDate = new Date(inputDateString);
                        console.log('shashav',originalDate)
                        var day = originalDate.getDate();
                        var month = originalDate.toLocaleString('en-US', { month: 'short' });
                        var year = originalDate.getFullYear();

                        var formattedDate = `${day} ${month.toLowerCase()}, ${year}`;
                        // var dateComponents = inputDateString.split('/');
                        // var day = parseInt(dateComponents[0], 10);
                        // var month = parseInt(dateComponents[1], 10);
                        // var year = parseInt(dateComponents[2], 10);
                        // var inputDate = new Date(year, month - 1, day);

                        // var monthNames = [
                        // "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        // "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        // ];

                        // var formattedDate = inputDate.getDate() + ' ' + monthNames[inputDate.getMonth()] + ', ' + inputDate.getFullYear();
                        // console.log(userName);
                        // console.log(userleavetype);
                        // var imagePath = '';

                        // if (userprofile) {
                        //     imagePath = data.Pasted_url + '/storage/' + userprofile;
                        // }
                        innerhtml += `
                        <div  class="body-card" data-id="${id}" style="padding-bottom:12px; margin-top:10px;">
                        <div style="padding:10px">
                            <div class='d-flex'>
                            <div class='attendance-profile col-2' ><img src='${profile_pic}'></div>
                            <div class='username col-5' >${userName}</div>
                            <div class='requestedfor col-5' ><label>${requested_for}</label></div>
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-Side Navigation.svg'></div>
                            <div class='name col-10' >${formattedDate}</div>
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-Miscellaneous.svg'></div>
                            <div class='name col-4' >${check_in}</div>              
                            ${check_out ? `<div class='attendance-profile col-2'><img src='images/icons/att-Miscellaneous.svg'></div>
                            <div class='name col-4'>${check_out}</div>` : ''}
                            </div>
                            
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-message-circle.svg'></div>
                            <div class='name col-10' >${comments}</div>
                            </div> 
                            ${permission == true ? `
                            <div class='d-flex justify-content-between' style="margin-top:5px; padding:10px;">
                              <div class=" d-flex col-5 reject" data-id="${id}" data-toggle="modal" data-target="#exampleModal"><label>Decline</label><div><img src="images/icons/reject.png"></div></div>
                              <div class="d-flex col-5 approve" data-id="${id}"><label>Approve</label><div><img src="images/icons/approve.png"></div></div>
                            </div> ` : ''}

                        </div>
                        </div>`;
                    }




                    for (let i = 0; i < dataArray.length; i++) {
                        var id = dataArray[i].id;
                        var editPermission = dataArray[i].editPermission;
                        console.log('permission',editPermission)
                        var userprofile = dataArray[i].user.profile_pic;
                        var profile_pic = '';
                        if (userprofile) {
                            profile_pic = url + '/storage/' + userprofile;
                            // console.log(profile_pic)
                        }
                        var check_in_time = dataArray[i].check_in;

                        var dateTimeComponents = check_in_time.split(' ');
                        if(dateTimeComponents[2] == undefined)
                        {
                            var check_in = dateTimeComponents[1] ;
                        }
                        else{
                            var check_in = dateTimeComponents[1] + ' ' + dateTimeComponents[2];
                        }
                        console.log(check_in)

                        var check_out_time = dataArray[i].check_out;
                        if(check_out_time){
                            var dateTimeComponents = check_out_time.split(' ');
                            if(dateTimeComponents[2] == undefined)
                            {
                                var check_out = dateTimeComponents[1]; 

                            }
                            else{
                                var check_out = dateTimeComponents[1] + ' ' + dateTimeComponents[2]; 

                            }                        }
                        else{
                              var check_out =check_out_time;
                        }                      
                        var comments = dataArray[i].comments;
                        var requested_for = dataArray[i].requested_for;
                        var userName = dataArray[i].user.name + ' '+dataArray[i].user.lastName;
                        var inputDateString = dataArray[i].requested_on;
                        console.log('shashav',inputDateString)

                        var originalDate = new Date(inputDateString);
                        console.log('shashav',originalDate)
                        var day = originalDate.getDate();
                        var month = originalDate.toLocaleString('en-US', { month: 'short' });
                        var year = originalDate.getFullYear();
                        var formattedDate = `${day} ${month.toLowerCase()}, ${year}`;

                        // var formattedDate = `${day} ${month.toLowerCase()}, ${year}`;

                        // var dateComponents = inputDateString.split('/');
                        // var day = parseInt(dateComponents[0], 10);
                        // var month = parseInt(dateComponents[1], 10);
                        // var year = parseInt(dateComponents[2], 10);

                        // var inputDate = new Date(year, month - 1, day);

                        // var monthNames = [
                        // "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        // "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        // ];

                        // var formattedDate = inputDate.getDate() + ' ' + monthNames[inputDate.getMonth()] + ', ' + inputDate.getFullYear();
                        // console.log(formattedDate);
                        // console.log(userName);
                        // console.log(userleavetype);
                        // var imagePath = '';

                        // if (userprofile) {
                        //     imagePath = data.Pasted_url + '/storage/' + userprofile;
                        // }
                        innerhtml += `
                        <div  class="body-card" data-id="${id}" style="padding-bottom:12px; margin-top:10px;">
                        <div style="padding:10px">
                            <div class='d-flex'>
                            <div class='attendance-profile col-2' ><img src='${profile_pic}'></div>
                            <div class='username col-5' >${userName}</div>
                            <div class='requestedfor col-5' ><label>${requested_for}</label></div>
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-Side Navigation.svg'></div>
                            <div class='name col-10' >${formattedDate}</div>
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-Miscellaneous.svg'></div>
                            <div class='name col-4' >${check_in}</div>              
                            ${check_out ? `<div class='attendance-profile col-2'><img src='images/icons/att-Miscellaneous.svg'></div>
                            <div class='name col-4'>${check_out}</div>` : ''}
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-message-circle.svg'></div>
                            <div class='name col-10' >${comments}</div>
                            </div> 
                            ${editPermission == true ? `
                            <div class='d-flex justify-content-between' style="margin-top:5px; padding:10px;">
                              <div class=" d-flex col-5 reject" data-id="${id}" data-toggle="modal" data-target="#exampleModal"><label>Decline</label><div><img src="images/icons/reject.png"></div></div>
                              <div class="d-flex col-5 approve" data-id="${id}"><label>Approve</label><div><img src="images/icons/approve.png"></div></div>
                            </div> ` : ''}

                        </div>
                        </div>`;
                    }

                    // chrome.storage.sync.set({ 'attendance': innerhtml }, function() {});
                    document.getElementById("attendance-requests").innerHTML = innerhtml;
                    var allSkeleton = document.querySelectorAll('.skeleton')
                    allSkeleton.forEach(item=> {
                        item.classList.add('hidden');
                    })
                })




                    document.getElementById("attendance-requests").addEventListener("click", function (event) {
                        var approveButton = event.target.closest(".approve");
                        
                        if (approveButton) {
                        var requestId = approveButton.getAttribute("data-id");

                        var att_url = data1.Pasted_url;
                        att_url += "/api/auth/updateAttendance/" + requestId;
                        console.log(att_url)
                        fetch(proxyUrl + att_url, {
                                method: 'post',
                                headers: {
                                'Authorization': 'Bearer ' + data1.token,
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            status: 'Approve',
                        })


                        })
                        .then(function(response) {

                            return response.json();

                        }).then(function(response) {
                            console.log(response)
                            if (response.status == 200) {
                                var elementToRemove = document.querySelector(`.body-card[data-id="${requestId}"]`);
                                if (elementToRemove) {
                                    elementToRemove.remove();
                                }
                                //pop up notification
                                var popup = document.createElement("div");
                                popup.className = "popup d-flex justify-content-between";
                            
                                var image = document.createElement("img");
                                image.src = "images/icons/popupIcons.svg";
                                image.alt = "Popup Icon";
                                popup.appendChild(image);
                            
                                var textDiv = document.createElement("div");
                                textDiv.style.width = "73%";
                                textDiv.style.color = "Black";
                                textDiv.textContent = "Attendance Approved";
                                popup.appendChild(textDiv);
                            
                                document.body.appendChild(popup);
                            
                                popup.classList.add("show");
                            
                                setTimeout(function() {
                                    popup.remove();
                                }, 2000);                 
                            }
                           

                        });

                        
                        
                    }
                    });

                    // function approveAttendance(requestId) {

                    //     var elementToRemove = document.querySelector(`.body-card[data-id="${requestId}"]`);
                    //     if (elementToRemove) {
                    //         elementToRemove.remove();
                    //     }

                    // }
                   
                    document.getElementById("attendance-requests").addEventListener("click", function (event) {
                        var approveButton = event.target.closest(".reject");
                        
                        if (approveButton) {
                        var requestId = approveButton.getAttribute("data-id");
                        var decline =document.getElementById("decline-button");
                       decline.setAttribute("data-id",requestId);
                    }

                    });
                    
                    document.getElementById("decline-button").addEventListener("click", function (event) {

                      var declineid=this.getAttribute("data-id");
                      console.log(declineid)
                      var att_url = data1.Pasted_url;
                      att_url += "/api/auth/updateAttendance/" + declineid;
                      console.log(att_url)
                      fetch(proxyUrl + att_url, {
                              method: 'post',
                              headers: {
                              'Authorization': 'Bearer ' + data1.token,
                              'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          status: 'Reject',
                      })


                      })
                      .then(function(response) {

                          return response.json();

                      }).then(function(response) {
                          console.log(response)
                          if (response.status == 200) {
                            var elementToRemove = document.querySelector(`.body-card[data-id="${declineid}"]`);
                            if (elementToRemove) {
                                elementToRemove.remove();
                            }
                            document.getElementById("myModal").style.display = "block";
                          }      
                      });
                    });
                    document.getElementById("decline-buttons").addEventListener("click", function (event) {
                        document.getElementById("myModal").style.display = "none";


                    });

    })
}
