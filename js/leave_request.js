window.onload = function () {
    chrome.storage.sync.get(['token', 'Pasted_url', 'checkin','attendance','permission'], function (data1) {

// console.log(data)
//                     if (data && data.attendance) {
//                         document.getElementById("leave-requests").innerHTML = data.attendance;
//                     }
            var proxyUrl = '';
            var url = data1.Pasted_url;
            var att_url60 = data1.Pasted_url;

            att_url60 += "/api/auth/leaveRequests";
            console.log('amitkumar', att_url60);
            fetch(proxyUrl + att_url60, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + data1.token
                    }
                    // body:formData,

                })
                .then(function(response) {
                    // console.log('amitttttttttttt', response)
                    return response.json();

                })
                .then(data => {
                    // console.log('madhavsharmaaaaaaaaa', data.attendance_permissions[0]);
                    // console.log('madhavsharmaaaaaaaaa', data.attendance_permissions[0]==true);
                    // console.log('madhavsharmaaaaaaaaa', data.teamStatus);
                    var dataArray =data.others_leave_requests;
                    var dataArray2 =data.your_leave_requests;
                    console.log('madhavsharma', data);
                    console.log('madhavsharma', dataArray2);

                    let innerhtml = "";
                    for (let i = 0; i < dataArray2.length; i++) {
                        var id = dataArray2[i].id;
                        var userprofile = dataArray2[i].user.profile_pic;
                        var profile_pic = '';
                        if (userprofile) {
                            profile_pic = url + '/storage/' + userprofile;
                            // console.log(profile_pic)
                        }
                        
                                          
                        var leavetype = dataArray2[i].leave.description;
                        var permission = dataArray2[i].editPermission;
                        var comments = dataArray2[i].reason;
                        var requested_for = dataArray2[i].is_process;
                        console.log('req',requested_for)
                        if(requested_for <= 1 )
                        {
                            var days = "Day"
                        }
                        else{
                            var days ="Days"
                        }
                        var userName = dataArray2[i].user.name + ' '+dataArray2[i].user.lastName;
                        var inputDateString = dataArray2[i].from_date;
                        var spoken_to = dataArray2[i].spoken_to;
                        var dateComponents = inputDateString.split('/');
                        var day = parseInt(dateComponents[0], 10);
                        var month = parseInt(dateComponents[1], 10);
                        var year = parseInt(dateComponents[2], 10);

                        var inputDate = new Date(year, month - 1, day);
                        var inputDateString2 = dataArray2[i].to_date;
                        var dateComponents2 = inputDateString2.split('/');
                        var day2 = parseInt(dateComponents2[0], 10);
                        var month2 = parseInt(dateComponents2[1], 10);
                        var year2 = parseInt(dateComponents2[2], 10);

                        var inputDate2 = new Date(year2, month2 - 1, day2);

                        var monthNames = [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ];

                        var fromdate = inputDate.getDate() + ' ' + monthNames[inputDate.getMonth()];
                        var todate = inputDate2.getDate() + ' ' + monthNames[inputDate2.getMonth()] + ', ' + inputDate.getFullYear();
                       
                       
                        innerhtml += `
                        <div  class="body-card" data-id="${id}" style="padding-bottom:12px; margin-top:10px;">
                        <div style="padding:10px">
                            <div class='d-flex'>
                            <div class='attendance-profile col-2' ><img src='${profile_pic}'></div>
                            <div class='username col-6' >${userName}</div>
                            <div class='requestedfor col-4' ><label>${requested_for}</label></div>
                            </div>
                            <div class='d-flex' style="">
                            <div class='requestedfor col-4' >${leavetype}</div>              
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-Side Navigation.svg'></div>
                            <div class='name col-10' >${fromdate} - ${todate}</div>              
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/spoken_to_1.svg'></div>
                            <div class='name col-10' >${spoken_to}</div>              
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-message-circle.svg'></div>
                            <div class='name col-10' style="line-break: anywhere;">${comments}</div>
                            </div> 
                            ${permission == true ? `
                            <div class='d-flex justify-content-between' style="margin-top:5px; padding:10px;">
                              <div class=" d-flex col-5 reject" data-id="${id}" data-toggle="modal" data-target="#exampleModal"><label>Decline</label><div><img src="images/icons/reject.png"></div></div>
                              <div class="d-flex col-5 approve" data-id="${id}"><label>Approve</label><div><img src="images/icons/approve.png"></div></div>
                            </div>` : ''}

                        </div>
                        </div>`;
                    }
                    //other team leave requests
                    for (let i = 0; i < dataArray.length; i++) {
                        var id = dataArray[i].id;
                        var editPermission = dataArray[i].editPermission;
                        var userprofile = dataArray[i].user.profile_pic;
                        var profile_pic = '';
                        if (userprofile) {
                            profile_pic = url + '/storage/' + userprofile;
                            // console.log(profile_pic)
                        }
                        
                        var leavetype = dataArray[i].leave.description;
                        var comments = dataArray[i].reason;
                        var requested_for = dataArray[i].leave_length;
                        console.log(requested_for)
                        if(requested_for <= 1 )
                        {
                            var days = "Day"
                        }
                        else{
                            var days ="Days"
                        }
                        var userName = dataArray[i].user.name + ' '+dataArray[i].user.lastName;
                        var inputDateString = dataArray[i].from_date;
                        var spoken_to = dataArray[i].spoken_to;
                        var dateComponents = inputDateString.split('/');
                        var day = parseInt(dateComponents[0], 10);
                        var month = parseInt(dateComponents[1], 10);
                        var year = parseInt(dateComponents[2], 10);

                        var inputDate = new Date(year, month - 1, day);
                        var inputDateString2 = dataArray[i].to_date;
                        var dateComponents2 = inputDateString2.split('/');
                        var day2 = parseInt(dateComponents2[0], 10);
                        var month2 = parseInt(dateComponents2[1], 10);
                        var year2 = parseInt(dateComponents2[2], 10);

                        var inputDate2 = new Date(year2, month2 - 1, day2);

                        var inputDate = new Date(year, month - 1, day);

                        var monthNames = [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ];

                        var fromdate = inputDate.getDate() + ' ' + monthNames[inputDate.getMonth()];
                        var todate = inputDate2.getDate() + ' ' + monthNames[inputDate2.getMonth()] + ', ' + inputDate.getFullYear();                       
                       
                        innerhtml += `
                        <div  class="body-card" data-id="${id}" style="padding-bottom:12px; margin-top:10px;">
                        <div style="padding:10px">
                            <div class='d-flex'>
                            <div class='attendance-profile col-2' ><img src='${profile_pic}'></div>
                            <div class='username col-6' >${userName}</div>
                            <div class='requestedfor col-4' ><label>${requested_for} ${days}</label></div>
                            </div>
                            <div class='d-flex' style="">
                            <div class='requestedfor col-4' >${leavetype}</div>              
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-Side Navigation.svg'></div>
                            <div class='name col-10' >${fromdate} - ${todate}</div>              
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/spoken_to_1.svg'></div>
                            <div class='name col-10' >${spoken_to}</div>              
                            </div>
                            <div class='d-flex' style="margin-top:5px;">
                            <div class='attendance-profile col-2' ><img src='images/icons/attendance-message-circle.svg'></div>
                            <div class='name col-10' style="line-break: anywhere;">${comments}</div>
                            </div> 
                            ${editPermission == true ? `
                            <div class='d-flex justify-content-between' style="margin-top:5px; padding:10px;">
                              <div class=" d-flex col-5 reject" data-id="${id}" data-toggle="modal" data-target="#exampleModal"><label>Decline</label><div><img src="images/icons/reject.png"></div></div>
                              <div class="d-flex col-5 approve" data-id="${id}"><label>Approve</label><div><img src="images/icons/approve.png"></div></div>
                            </div>` : ''} 

                        </div>
                        </div>`;
                    }

                    // chrome.storage.sync.set({ 'attendance': innerhtml }, function() {});
                    document.getElementById("leave-requests").innerHTML = innerhtml;
                    var allSkeleton = document.querySelectorAll('.skeleton')
                    allSkeleton.forEach(item=> {
                        item.classList.add('hidden');
                    })
                })




                    document.getElementById("leave-requests").addEventListener("click", function (event) {
                        var approveButton = event.target.closest(".approve");
                        
                        if (approveButton) {
                        var requestId = approveButton.getAttribute("data-id");

                        var att_url = data1.Pasted_url;
                        att_url += "/api/auth/updateLeave/" + requestId;
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
                                textDiv.textContent = "Leave Approved";
                                popup.appendChild(textDiv);
                            
                                document.body.appendChild(popup);
                            
                                popup.classList.add("show");
                            
                                setTimeout(function() {
                                    popup.remove();
                                }, 1500);       
                                var elementToRemove = document.querySelector(`.body-card[data-id="${requestId}"]`);
                                if (elementToRemove) {
                                    elementToRemove.remove();
                                }
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

                    document.getElementById("leave-requests").addEventListener("click", function (event) {
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
                      att_url += "/api/auth/updateLeave/" + declineid;
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
