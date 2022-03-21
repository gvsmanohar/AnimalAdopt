//method to send post request for storing the animal details and to show thank you message on success
function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (dataR) {
            var ret = dataR;
            $("#uploadmsg").show();
            setTimeout(function(){
                $("#uploadmsg").hide();
            }, 3000);
            $('#add-animal-form')[0].reset();
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });
}
//method to get the new animal details from add-animal form and call post method
function addanimal() {

    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById('add-animal-form');
    var formData = new FormData(myForm);
    console.log(formData);
    sendAjaxQuery('/donate', formData);
    return false;
}


