
//date selection functionality...........................................
function fetchAttendanceDetails(formattedDate, data, data3, data8) {
    return new Promise((resolve, reject) => {
        const proxyUrl = '';
        let teamId =7;
        // let att_url2 = data3.Pasted_url + "/api/auth/update-attendance-detail";
        let att_url2 = data3.Pasted_url + "/api/auth/reports";
        
        // AMS Api for checking the time - get method here
        let formData = new FormData();
        // formData.append('userId', data8.userId);
        // formData.append('date', formattedDate);
        formData.append('userid', 87);
        formData.append('teamid', 1);
        formData.append('shiftid', null);
        formData.append('month', '01/2024');

        fetch(proxyUrl + att_url2, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + data.token
            },
            body: formData,
        })
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function updateUI(response) {
    $("#shiftname").text('');
    $("#modeltext").text('');
    $("#check_in").val('');
    $("#check_out").val('');
    $("#shift").text('');
    console.log(response)
    if (response.canRequest == false) {
        $("#date-range").val('');
        $(".checkin-place").css('display', 'none');
        $(".checkout-place").css('display', 'none');
        $("#modeltext").text("Grace Period Ended");
        document.getElementById("myModal").style.display = "block";
    } else if (response.message != null) {
        $("#date-range").val('');
        $(".checkin-place").css('display', 'none');
        $(".checkout-place").css('display', 'none ');
        $("#modeltext").text(response.message);
        document.getElementById("myModal").style.display = "block";
    } else {
        $(".checkin-place").removeAttr('style');
        $(".checkout-place").removeAttr('style');
        if (response.attendanceid != '') {
            $("#attendanceDetailId").val(response.attendanceid);
        }

        if (response.currentShift != '') {
            $("#shiftname").text(response.currentShift);
        }

        if (response.check_in != '') {
            var formattedCheckInTime = response.check_in;
            $("#check_in").val(formattedCheckInTime);
            $("#check_in_time").val(response.check_in);
        }

        if (response.check_out != '') {
            var formattedCheckOutTime = response.check_out;
            $("#check_out").val(formattedCheckOutTime);
            $("#check_out_time").val(response.check_out);
        }

        if (response.currentShiftId != '') {
            $("#shift").val(response.currentShiftId);
        }

        if (response.user_shift_name != '') {
            $("#shiftname").val(response.user_shift_name);
        }

        document.getElementById("Updatebtn").style.display = 'block';
    }
}

var dateRangePickerConfig = {
    maxDate: new Date(),
    opens: 'left',
    drops: 'down',
    autoApply: true,
    autoApply: false,
    linkedCalendars: false,
    singleDatePicker: true,
    showDropdowns: true, 
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
    isInvalidDate: function(date) {
        var shiftendtime = document.getElementById('shiftendtime').value;
        if(shiftendtime != "true"){
            return date.isSame(new Date(), 'day');
        }

    },
    
    // startDate: null,
};
console.log(dateRangePickerConfig)
$('#date-range').daterangepicker(dateRangePickerConfig);
// $('#date-range').on('apply.daterangepicker', function(event, picker) {
//     const formattedDate = picker.startDate.format('DD/MM/YYYY');
//     $(this).val(formattedDate); 
// });
$('#date-range').val('');
$('#date-range').attr("placeholder","Date");

$('#date-range').on('apply.daterangepicker', async function(event, picker) {
    try {
        const data = await new Promise((resolve) => {
            chrome.storage.sync.get(['token'], (result) => resolve(result));
        });

        const data3 = await new Promise((resolve) => {
            chrome.storage.sync.get(['Pasted_url'], (result) => resolve(result));
        });

        const data8 = await new Promise((resolve) => {
            chrome.storage.sync.get(['userId'], (result) => resolve(result));
        });
        const data9 = await new Promise((resolve) => {
            chrome.storage.sync.get(['dateFormat'], (result) => resolve(result));
        });
        console.log('data9',data9.dateFormat)
        if( data9.dateFormat== 'd/m/Y')
        {
            var formattedDate = picker.startDate.format('DD/MM/YYYY');

        }else if(data9.dateFormat== 'm/d/Y')
        {
            var formattedDate = picker.startDate.format('MM/DD/YYYY');

        }else{
            var formattedDate = picker.startDate.format('YYYY/MM/DD');

        }
        // alert(formattedDate)
        $(this).val(formattedDate); 

        const response = await fetchAttendanceDetails(formattedDate, data, data3, data8);
        updateUI(response);
    } catch (error) {
        console.error(error);
    }
});
//time selection functionality.......................................
$('#check_in').datetimepicker({
    format: 'hh:mm A'
});
$('#check_out').datetimepicker({
    format: 'hh:mm A'
});
window.onload = function () {
    //popup model back button functionality
    document.getElementById("decline-buttons").addEventListener("click", function (event) {
        document.getElementById("myModal").style.display = "none";

    });
    //Getting the Token i.e Saved After Login

    chrome.storage.sync.get('token', function (data) {
        chrome.storage.sync.get('tok_exp', function (data2) {
            chrome.storage.sync.get('Pasted_url', function (data3) {
             chrome.storage.sync.get(['userId','dateFormat'], function (data8) {
                
                // $('#date-range').attr('placeholder', 'Select Date');
                
                // var currentDate = new Date();

                // // Disable current day
                // currentDate.setDate(currentDate.getDate() - 1);

                // // Format the date to YYYY-MM-DD
                // var formattedCurrentDate = currentDate.toISOString().split('T')[0];

                // document.getElementById('anytime_month_numeric_attendance_update').setAttribute('max', formattedCurrentDate);
                var new_url = data.Pasted_url;
                //Making Functions for the Buttons
                var proxyUrl = '';
                var att_url1 = data3.Pasted_url;
                att_url1 += "/api/auth/checkForLateCheckinEarlyCheckout";
                fetch(proxyUrl + att_url1, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + data.token
                    },
                    //  body:formData,


                }).then(response => response.json())
                .then(function (response) {
                    console.log(response.afterShiftTime)
                $('#shiftendtime').val(response.afterShiftTime);
                var shiftendtime = document.getElementById('shiftendtime').value;
                console.log(shiftendtime)
                });

                //request button functionality...............................................................
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
                            popup.className = "att-popup d-flex justify-content-between";
                
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
                    
                    var selectedDate = document.getElementById('date-range').value;
                    var checkInTime = document.getElementById('check_in').value;
                    var checkOutTime = document.getElementById('check_out').value;
                    var comment = document.getElementById('comment').value;
                    
                    if (!selectedDate) {
                        showMessage("Select a date first !!");
                        return false;
                    }
                    
                    if (!checkInTime) {
                        showMessage("Please enter check-in time !!");
                        return false;
                    }
                    
                    if (!checkOutTime) {
                        showMessage("Please enter check-out time !!");
                        return false;
                    }
                    
                    if (!comment.trim()) {
                        showMessage("Please enter the reason !!");
                        return false;
                    } else if (comment.replace(/\s/g, '').length <= 10) {
                        showMessage("Reason must be more than 10 characters !!");
                        return false;
                    }
                                        
                var proxyUrl = '';
                var att_url2 = data3.Pasted_url;
                att_url2 += "/api/auth/send-request-attendance/"+2000;
                var requestdate = document.getElementById('date-range').value;
                var shift = document.getElementById('shift').value;
                var check_in = document.getElementById('check_in').value;
                var check_out = document.getElementById('check_out').value;
                var comment = document.getElementById('comment').value;
                console.log(check_in)
                console.log(check_out)
                console.log(shift)
                console.log(data8.userId)
                console.log(requestdate)
                     //AMS Api for checking the time
                     //get method here
                     let formData = new FormData();
                    formData.append('date', requestdate);
                    formData.append('shift', shift);
                    formData.append('check_in', check_in);
                    formData.append('check_out', check_out);
                    formData.append('comment', comment);
                    formData.append('user', data8.userId);
                    formData.append('requestType', "api");
                    console.log(formData)
                    fetch(proxyUrl + att_url2, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + data.token
                        },
                         body:formData,


                    }).then(response => response.json())
                    .then(function (response) {
                            // console.log(response.message);
                            if(response.message == "You can request only twice for a date")
                            {
                                $(".checkin-place").css('display', 'none');
                                $(".checkout-place").css('display', 'none');
                                $("#modeltext").text(response.message);
                                document.getElementById("myModal").style.display = "block";
                                    $("#date-range").val('');
                                    $("#shiftname").text('');
                                    $("#check_in").val('');
                                    $("#check_out").val('');
                                    $("#shift").text('');
                                    $("#comment").val('');
                            }
                            if(response.message == "Attendance Request Sent Successfully")
                            {
                                // $("#Updatebtn").attr('disabled','disabled');
                                $(".checkin-place").css('display', 'none');
                                $(".checkout-place").css('display', 'none');
                                    var popup = document.createElement("div");
                                    popup.className = "popup d-flex justify-content-between";
                                
                                    var textDiv = document.createElement("div");
                                    textDiv.style.width = "97%";
                                    textDiv.style.color = "Black";
                                    textDiv.style.textAlign = "center";
                                    textDiv.style.fontSize = "15px";
                                    textDiv.textContent = "Attendance Request Sent Successfully !!";
                                    popup.appendChild(textDiv);
                                
                                    document.body.appendChild(popup);
                                
                                    popup.classList.add("show");
                                
                                    setTimeout(function() {
                                        popup.remove();
                                    }, 1500);
                                    $("#date-range").val('');
                                    $("#shiftname").text('');
                                    $("#check_in").val('');
                                    $("#check_out").val('');
                                    $("#shift").text('');
                                    $("#comment").val('');
                            }
                            
                    })
                
               
               };
               });
            });
        });

    });

}
