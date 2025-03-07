$('#date-range').daterangepicker({
    minDate: new Date(),
    opens: 'left',
    drops: 'down',
    autoApply: true,
    linkedCalendars: false,
    howDropdowns: true, 
    autoUpdateInput: false,
    locale: {
        format: 'DD/MM/YYYY',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        fromLabel: 'From',
        toLabel: 'To',
        customRangeLabel: 'Custom',
        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        firstDay: 0
    },
}, function (start, end, label) {
    updateHiddenFields(start, end);

});
$('#date-range').val('');
$('#date-range').attr("placeholder","Date");
// Set the start date to the current date
var currentDate = moment();
$('#date-range').data('daterangepicker').setStartDate(currentDate);

// Call the function to set the initial values on page load
updateHiddenFields(currentDate, currentDate);

// Event handler for apply button
$('#date-range').on('apply.daterangepicker', function (ev, picker) {
    var startDate = picker.startDate;
    var endDate = picker.endDate;
    dateformat = document.getElementById('dateformat').value;   
    if( dateformat== 'd/m/Y')
    {
        $('#date-range').val(startDate.format('DD/MM/YYYY') + ' - ' + endDate.format('DD/MM/YYYY'));

    }
    else if(dateformat== 'm/d/Y')
    {
        $('#date-range').val(startDate.format('MM/DD/YYYY') + ' - ' + endDate.format('MM/DD/YYYY'));

    }
    else{
        $('#date-range').val(startDate.format('YYYY/MM/DD') + ' - ' + endDate.format('YYYY/MM/DD'));

    }

    // Call the function to update hidden fields
    updateHiddenFields(startDate, endDate);
});

function updateHiddenFields(startDate, endDate) {
    // Set the values of the hidden input fields
    dateformat = document.getElementById('dateformat').value;   
    if( dateformat== 'd/m/Y')
    {
        $('#hiddenFromDate').val(startDate.format('DD/MM/YYYY'));
        $('#hiddenToDate').val(endDate.format('DD/MM/YYYY'));
    }else if(dateformat== 'm/d/Y')
    {
        $('#hiddenFromDate').val(startDate.format('MM/DD/YYYY'));
        $('#hiddenToDate').val(endDate.format('MM/DD/YYYY'));
    }else{
        $('#hiddenFromDate').val(startDate.format('YYYY/MM/DD'));
        $('#hiddenToDate').val(endDate.format('YYYY/MM/DD'));
    }   

    // Calculate weekend count
    var weekends = $('#hiddenWeekends').val().split(',');
    var daysCounts = 0;
    var daysCount = endDate.diff(startDate, 'days') + 1;

    for (var i = 0; i < daysCount; i++) {
        var currentDate = startDate.clone().add(i, 'days');
        var currentDayOfWeek = currentDate.format('ddd').toLowerCase();

        if (!weekends.includes(currentDayOfWeek)) {
            daysCounts++;
        }
    }

    // Set the value of the weekend count input field
    $('#weekendcount').val(daysCounts);
}

function getDaysBetweenDates(startDate, endDate) {
    var days = [];
    var currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate)) {
        days.push(currentDate.format('ddd').toLowerCase());
        currentDate.add(1, 'days');
    }

    return days;
}

window.onload = function () {
 
    document.getElementById("decline-buttons").addEventListener("click", function (event) {
        document.getElementById("myModal").style.display = "none";


    });
    //Getting the Token i.e Saved After Login

    chrome.storage.sync.get('token', function (data) {
        chrome.storage.sync.get('tok_exp', function (data2) {
            chrome.storage.sync.get('Pasted_url', function (data3) {
                chrome.storage.sync.get(['userId','dateFormat'], function (data8) {
                    console.log("format",data8)
                    $('#dateformat').val(data8.dateFormat);
                       
                    // console.log(data8)
                    // if (data8.newDivHTML) {
                    //     var storedHTML = result.newDivHTML;
                
                    //     leaveBalanceDiv.innerHTML = storedHTML;
                    // }
                // $('input[name="from"]').val('');
                // $('input[name="from"]').attr("placeholder","Date");
                // $('input[name="from"]').attr("autofocus", "false");
             
                var new_url = data.Pasted_url;
               
                //get leave types
                    var proxyUrl = '';
                    var att_url2 = data3.Pasted_url;
                    att_url2 += "/api/auth/leave-types"
                   
                        //AMS Api for checking the time
                        //get method here
                       
                        fetch(proxyUrl + att_url2, {
                            method: 'get',
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + data.token
                            },
                            // body:formData,


                        })
                            .then(function (response) {
                                return response.json();

                            }).then(function (response) {
                               console.log('sharma',response)
                               var leaveTypes = response.leaves;

                            //    var leaveid = leaveTypes.map(leave => leave.id);
                               console.log(leaveid)
                               leaveTypes.sort((a, b) => a.id - b.id);
                               console.log(leaveTypes)

                            // ...

                                let leaveBalanceData = []; 

                                for (let i = 0; i < leaveTypes.length; i++) {
                                    var leaveid = leaveTypes[i].id;
                                    var leavename = leaveTypes[i].abbr;
                                    console.log(leavename)
                                    var proxyUrl = '';
                                    var att_url2 = data3.Pasted_url;
                                    att_url2 += "/api/auth/getLeaveBal"
                                    let balanceformData = new FormData();
                                    balanceformData.append('leaveId', leaveid);
                                    balanceformData.append('user_id', data8.userId);

                                    (function (currentLeaveName, leaveids) {
                                        fetch(proxyUrl + att_url2, {
                                            method: 'post',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Authorization': 'Bearer ' + data.token
                                            },
                                            body: balanceformData,
                                        })
                                        .then(function (response) {
                                            return response.json();
                                        })
                                        .then(function (response) {
                                            console.log('Balance', response);

                                            // Push fetched data to the array
                                            leaveBalanceData.push({
                                                leaveid: leaveids,
                                                leaveName: currentLeaveName,
                                                balance: response.leaveBalance
                                            });

                                            // Sort the array based on leaveids
                                            leaveBalanceData.sort((a, b) => parseInt(a.leaveid) - parseInt(b.leaveid));

                                            // Render the sorted elements
                                            renderLeaveBalance();
                                        });
                                    })(leavename, leaveid);
                                }

                                function renderLeaveBalance() {
                                    var leaveBalanceDiv = document.getElementById('leaveBalance');
                                    leaveBalanceDiv.innerHTML = ''; // Clear existing content

                                    // Append elements to the div in the sorted order
                                    for (let i = 0; i < leaveBalanceData.length; i++) {
                                        var leaveData = leaveBalanceData[i];
                                        var newDiv = document.createElement('div');
                                        newDiv.classList.add('leave-box');
                                        newDiv.innerHTML = `
                                            <div class='skelten' id="${leaveData.leaveid}" style='background-color:${getRandomColor()}; color: white; border-radius: 10px; padding: 8px;'>
                                                ${leaveData.leaveName} - ${leaveData.balance}
                                            </div>
                                        `;
                                        leaveBalanceDiv.appendChild(newDiv);
                                        
                                    }
                                }
                        
                                function getRandomColor() {
                                    let chars = "0123456789ABCDEF", color="";
                                    for (let i = 0; i < 6; i++) {
                                    color += chars[Math.floor(Math.random() * 16)];
                                    }
                                    return '#'+color;
                                }

                               var selectElement = document.getElementById('leave-type');

                                selectElement.innerHTML = '';
                                var type = document.createElement('option');
                                type.textContent = 'Leave';
                                type.disabled = true;
                                type.selected = true;
                                selectElement.appendChild(type);
                                response.leaves.forEach(function(leave) {
                                    var option = document.createElement('option');

                                    option.textContent = leave.name;
                                    option.value = leave.id;

                                    selectElement.appendChild(option);
                                 })
                            })
                            var leaveTypeSelected = document.getElementById('leave-type');
                            leaveTypeSelected.addEventListener('change', function() {
                              var selectedValued = leaveTypeSelected.value; 
                              var proxyUrl = '';
                                var att_url2 = data3.Pasted_url;
                                att_url2 += "/api/auth/get-leave-count"
                                let formData = new FormData();       
                                formData.append('leaveId', selectedValued);
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
                                    console.log(response)
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
                                    if (response.leaveBalance == "0") {
                                        $('.fh-leave').css('display', 'none');
                                        $('.half-day').css('display', 'none');
                                        $('.checkout-place').css('display', 'none');
                                        $('.spoken_to').css('display', 'none');
                                        $('#Updatebtn').prop("disabled", true);
                                        $("#comment").val('');
                                        showMessage("You do not have enough leave balance !");
                                        return false;
                                    }else{
                                        $("#leavetype").val("Half Day / Full Day");
                                        $("#halfdaytype").val("First Half / Second Half");
                                        $("#date-range").val("");
                                        $("#spoken_to").val('');
                                        $("#comment").val('');
                                        $('.half-day').css('display', 'none');
                                        $("#date-range").prop("disabled", true);
                                        $('#leaveid').val(selectedValued);
                                        $('#leavetype').prop("disabled", false);
                                        $('#Updatebtn').prop("disabled", false);  
                                        $('.fh-leave').removeAttr("style");
                                        $('.checkout-place').removeAttr("style");
                                        $('.hideleave').removeAttr("style");
                                    }
                                   
                                });
                             
                            
                            });
                            var halfleaveTypeSelected = document.getElementById('halfdaytype');
                            halfleaveTypeSelected.addEventListener('change', function() {
                              var halfselectedValued = halfleaveTypeSelected.value;
                        
                              console.log('Select:', halfselectedValued);
                              $('#halfdayleaveid').val(halfselectedValued);

                            });



                            //get the leave balance

                            // var proxyUrl = '';
                            // var att_url2 = data3.Pasted_url;
                            // att_url2 += "/api/auth/getLeaveBal"
                            // let balanceformData = new FormData();       
                            // balanceformData.append('leaveId', 1);
                            // balanceformData.append('user_id', 3);
                            // fetch(proxyUrl + att_url2, {
                            //     method: 'post',
                            //     headers: {
                            //         'Accept': 'application/json',
                            //         'Authorization': 'Bearer ' + data.token
                            //     },
                            //     body:balanceformData,


                            // })
                            // .then(function (response) {
                            //     return response.json();

                            // }).then(function (response) {
                            // console.log('balancecount',response)

                            // })

                            
                            //get user's weekend
                           
                                var proxyUrl = '';
                                var att_url2 = data3.Pasted_url;
                                att_url2 += "/api/auth/get-weekend-count"
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
                                console.log(response.weekends)
                                $('#hiddenWeekends').val(response.weekends);

                                })
               
                            var leaveTypeSelect = document.getElementById('leavetype');
                              leaveTypeSelect.addEventListener('change', function() {
                              var selectedValue = leaveTypeSelect.value;
                            //   var dateInput = document.getElementById('date');
                              if (selectedValue === 'half_day') {
                                $('#half-day').removeAttr("style");

                              }
                              if (selectedValue === 'full_day') {
                                $('.half-day').css('display', 'none');
                                $('#halfdayleaveid').val('');
                                $("#halfdaytype").val("First Half / Second Half");


                              }
                              $('#date-range').prop("disabled", false);
                              $('.hideleave').removeAttr("style");

                              $('#leavet').val(selectedValue);
                                var leavetype = $('#leavetype').val();
                                console.log(leavetype)
                                var proxyUrl = '';
                                var att_url2 = data3.Pasted_url;
                                att_url2 += "/api/auth/apply-leave"
                                // var requestdate = document.getElementById('anytime_month_numeric_attendance_update').value;
                                // var shift = document.getElementById('shift').value;
                                // var check_in = document.getElementById('check_in').value;
                                // var check_out = document.getElementById('check_out').value;
                                // var comment = document.getElementById('comment').value;
                                     //AMS Api for checking the time
                                     //get method here
                                    let formData = new FormData();
                                    formData.append('leavetype', leavetype);
                                    fetch(proxyUrl + att_url2, {
                                        method: 'post',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Authorization': 'Bearer ' + data.token
                                        },
                                         body:formData,
                
                
                                    }).then(response => response.json())
                                    .then(function (response) {
                                            console.log('leave-apply',response);
                                        })
                               
                            });
                // leave submit functionality
                document.getElementById('Updatebtn').onclick = function () {
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
                    
                    var selectedLeave = document.getElementById('leave-type').value;
                    var selectedLeavetype = document.getElementById('leavetype').value;
                    var selectedHalfLeavetype = document.getElementById('halfdaytype').value;
                    var spoken_to = document.getElementById('spoken_to').value;
                    var comment = document.getElementById('comment').value;
                    var selectedDate = document.getElementById('date-range').value;
                    
                   
                    if (selectedLeave == "Leave") {
                        showMessage("Please select a leave !");
                        return false;
                    }
                    
                    if (selectedLeavetype == "Half Day / Full Day") {
                        showMessage("Please select a leave duration type !");
                        return false;
                    }
                    var leaveTypeSelect = document.getElementById('leavetype');
                    var selectedValue = leaveTypeSelect.value;
                    if(selectedValue == "half_day")
                    {
                        if (selectedHalfLeavetype == "First Half / Second Half") {
                            showMessage("Please select a half leave duration type !");
                            return false;
                        }
                    }
                    
                    if (!selectedDate) {
                        showMessage("Please select a date !");
                        return false;
                    }
                    if (!spoken_to) {
                        showMessage("Please enter manager's name with whom you discussed this leave !");
                        return false;
                    }
                    
                    if (!comment.trim()) {
                        showMessage("Please enter the reason !");
                        return false;
                    } else if (comment.replace(/\s/g, '').length <= 10) {
                        showMessage("Reason must be grater than 10 characters !");
                        return false;
                    }
               
                var proxyUrl = '';
                var att_url2 = data3.Pasted_url;
                att_url2 += "/api/auth/apply-leave"
                var leave_id = document.getElementById('leaveid').value;
                var leavet = document.getElementById('leavet').value;
                var halfDayType = document.getElementById('halfdayleaveid').value;
                var fromdate = document.getElementById('hiddenFromDate').value;
                var todate = document.getElementById('hiddenToDate').value;
                var leave_length = document.getElementById('weekendcount').value;
                var comment = document.getElementById('comment').value;
                var spoken_to = document.getElementById('spoken_to').value;
                     //AMS Api for checking the time
                     //get method here
                     let formData = new FormData();
                    formData.append('leave_id', leave_id);
                    formData.append('leavetype', leavet);
                    formData.append('from_date', fromdate);
                    formData.append('to_date', todate);
                    formData.append('leave_length', leave_length);
                    formData.append('reason', comment);
                    formData.append('halfDayType', halfDayType);
                    formData.append('spoken_to', spoken_to);
                    formData.append('requestType', "api");
                    console.log('form',formData)
                    fetch(proxyUrl + att_url2, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + data.token
                        },
                         body:formData,


                    }).then(response => response.json())
                    .then(function (response) {
                        console.log('leave',response)
                            console.log(response.warning);
                           
                            // if(response.warning == "Already Taken Leave On This Date!"){
                            //     $("#comment").val('');
                            //     $("#spoken_to").val('');
                            //     $("#date-range").val('');
                            //     $("#modeltext").text(response.warning);
                            //     document.getElementById("myModal").style.display = "block";
                            // }
                            if(response.warning){
                                $("#comment").val('');
                                $("#spoken_to").val('');

                                $("#modeltext").text(response.warning);
                                document.getElementById("myModal").style.display = "block";
                            }
                            // if(response.warning == "Duration field is required"){
                            //     $("#comment").val('');
                            //     $("#spoken_to").val('');

                            //     $("#modeltext").text(response.warning);
                            //     document.getElementById("myModal").style.display = "block";
                            // }
                            // if(response.warning == "Reason field is required"){
                            //     $("#comment").val('');
                            //     $("#spoken_to").val('');

                            //     $("#modeltext").text(response.warning);
                            //     document.getElementById("myModal").style.display = "block";
                            // }
                            if(response.success == "Leave Submit Successfully!"){
                                $("#leave-type").val("Leave");
                                $('.fh-leave').css('display', 'none');
                                $('.half-day').css('display', 'none');
                                $('.checkout-place').css('display', 'none');
                                $('.spoken_to').css('display', 'none');
                                $("#comment").val('');
                                $("#spoken_to").val('');
                                $("#date-range").val('');

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
                                 textDiv.textContent = "Leave Request Sent Successfully";
                                 popup.appendChild(textDiv);
                             
                                 document.body.appendChild(popup);
                             
                                 popup.classList.add("show");
                             
                                 setTimeout(function() {
                                     popup.remove();
                                     window.location.href = "request_leave.html";
                                 }, 2000);  
                            }
                        })
               };
                //Logout
              /*  document.getElementById('Logout').onclick = function () {
                    alert("You have been Logged Out Succesfully!");
                          //Also Deleting the token from the Local Storage
                          chrome.storage.sync.set({ 'token': 1 }, function () {
                            //alert(Success);
                     
                            //Changing the Popup After Logging out
                    chrome.browserAction.setPopup({ popup: "index.html" })
                    location.href = 'index.html'

    
                        });
                };
                
*/

              });
            });
        });

    });

}
