//document.getElementById('Save').onclick = function () {
document.getElementById("Save").addEventListener("click", function(event) {
    event.preventDefault()
    //Getting and setting URL
    var linkElement;
    var targetUrl = document.getElementById('url').value.trim(); 
    if (!targetUrl) {
        // Show the "Invalid Workspace URL" message
        $('.wrap-error span').text('Invalid Workspace URL');
        $('.wrap-error').show();
        return;
    } else {
        $('.wrap-error').hide();
    }
    var urlPattern = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/\S*)?$/;
    if (!urlPattern.test(targetUrl)) {
        // Invalid Workspace URL format
        $('.input100').addClass('error');
        $('.input100').css('border', '1px solid red');
        $('.wrap-validate').hide();
        $('.wrap-error span').text('Workspace not running a valid server');
        $('.wrap-error').show();        
        return;
    }   
    // if (!targetUrl) {
    //     $('.input100').removeClass('error');
    //     $('.input100').css('border', '');
    //     $('.wrap-validate').show();
    //     $('.wrap-error').hide();
    //     $('.error-message').text('');
    // }
    console.log(targetUrl + '/api/auth/ping');

    chrome.storage.sync.set({ 'Pasted_url': targetUrl }, function() {
        // alert(Success);
    });
    chrome.storage.sync.get('Pasted_url', function(data) {

        if (!targetUrl) {
            // URL is null or empty
            $('.input100').removeClass('error');
            $('.input100').css('border', '');
            $('.wrap-validate').show();
            $('.wrap-error').hide();
        } else {
            // URL is not null or empty, execute the fetch request
            fetch(targetUrl + '/api/auth/ping')
                .then(response => response.json())
                .then(data => {
                    const dynamicURL = data.status;
                    linkElement = dynamicURL;

                    if (linkElement == 200) {
                        location.href = 'index.html';
                        chrome.browserAction.setPopup({ popup: "index.html" });
                    } else {
                        $('.input100').addClass('error');
                        $('.input100').css('border', '1px solid red');
                        $('.wrap-validate').hide();
                        $('.wrap-error span').text('Workspace not running a valid server');
                        $('.wrap-error').show();                    }
                })
                .catch(error => {
                    $('.input100').addClass('error');
                    $('.input100').css('border', '1px solid red');
                    $('.wrap-validate').hide();
                    $('.wrap-error span').text('Workspace not running a valid server');
                    $('.wrap-error').show();        
                });
        }


    });

});