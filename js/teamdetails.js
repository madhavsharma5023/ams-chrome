window.onload = function () {
    chrome.storage.sync.get(['token', 'Pasted_url', 'checkin'], function (data) {
        var anchorId = getParameterByName('id');
        console.log(anchorId)
        var url =data.Pasted_url;
        var att_url6 = data.Pasted_url + "/api/auth/teamDetails";
        var usersOnLeave = [];
        var noCheckinUsers = [];

        fetch(att_url6, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + data.token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var dataArray;

            switch (anchorId) {
                case 'Available':
                    dataArray = data.availableUsers;
                    break;
                case 'On Leave':
                    dataArray = data.usersOnLeave;
                    break;
                case 'Weekly Off':
                    dataArray = data.usersOnWeekend;
                    break;
                case 'No Check-in':
                    dataArray = data.noCheckinUsers;
                    break;
                case 'Early Check-out':
                    dataArray = data.earlyCheckoutUsers;
                    break;
                case 'Late Check-in':
                    dataArray = data.lateCheckinUsers;
                    break;
            }
            let innerhtml = "";

            if (dataArray && typeof dataArray === 'object' && Object.keys(dataArray).length > 0) {
                for (let key in dataArray) {
                    if (dataArray.hasOwnProperty(key)) {
                        var item = dataArray[key];
                        var userprofile = item.profilePic || item.profile_pic;
                        var userName = item.name;
                        if(item.leave_type == 'full_day'){
                            var leavetype = "Full day"
                        }else if(item.leave_type == 'half_day')
                        {
                            var leavetype = "Half day"
                        }
                        var usercheckin = item.checkin || leavetype || item.team || item.time;
                        if (item.checkin) {
                            var timeArray = usercheckin.split(':');
                            var hours = parseInt(timeArray[0], 10);
                            var suffix = hours >= 12 ? 'PM' : 'AM';
            
                            if (hours > 12) {
                                hours -= 12;
                            } else if (hours === 0) {
                                hours = 12;
                            }
            
                            var formattedTime = hours + ':' + timeArray[1] + ' ' + suffix;
                            usercheckin = formattedTime;
                        }
            
                       
                        var imagePath;

                        if (userprofile && userprofile.includes('global_assets')) {
                            imagePath = url + '/' + userprofile;
                        } else {
                            imagePath = userprofile ? url + '/storage/' + userprofile : '';
                        }            
                        innerhtml += `
                            <div class='d-flex justify-content-between' style="padding-bottom:12px">
                                <div class='profile-pic' style="width:7%;"><img class="img-fluid rounded-circle shadow-1" style="width: 25px; height: 25px;" src='${imagePath}' alt=''></div>
                                <div class='name' style="width:51%;">${userName}</div>
                                ${item.checkin || item.time ? `<div class='profile-pic' style="width:7%;"><img class="img-fluid rounded-circle shadow-1" style="width: 18px; height: 18px;" src='images/icons/Miscellaneous.png' alt=''></div>` : ''}
                                <div class='leave-type' style="width:30%; color:green;">${usercheckin}</div>
                            </div>`;
                    }
                }
            } else {
                innerhtml += `<div style="text-align: center; color:green;"><span>No User's with this status</span></div>`;
            }

            document.getElementById("temdetail").innerHTML = innerhtml;
            var allSkeleton = document.querySelectorAll('.skeleton')
            allSkeleton.forEach(item=> {
                item.classList.add('hidden');
            });
        });
    });

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}
