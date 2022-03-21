//method to send post request for storing the user query details and acknowledge the receipt.
function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var ret = dataR;
            $("#contactmsg").show();
            setTimeout(function(){
                $("#contactmsg").hide();
            }, 3000);
            $('#customer-contact-form')[0].reset();
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });
}
//method to get the query form values and call post method
function postquery(id, url) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById(id);
    var formData = $(myForm).serializeArray();
    console.log(formData);
    sendAjaxQuery(url, formData);
    return false;
}


