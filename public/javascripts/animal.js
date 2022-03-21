//event to enable navigation on enter from keyboard
function enablekeyup(){
    $('.animalImage').keyup(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $(event.target).click();
        }
    });
}
//method to navigate to animal page
function loadanimal(id){
    if(id != null || id != "")
        var animal_ele = event.target;
        var query_params = $(animal_ele).attr("qparams");
        window.location = '/animal?'+query_params
}

/*function showanimalpage(){
    var animal_ele = event.target;
    var query_params = $(animal_ele).attr("qparams");
    window.location = '/animal?'+query_params
}*/
//method to get details from the adopt-animal from and call post method
function adoptanimal() {
    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById('adopt-animal-form');
    var formData = $(myForm).serializeArray();
    let data={};
    console.log(formData);
    sendAjaxQuery('/applicantdata', formData);
    return false;
}

//method to post the adopt application form details and update the status of animal reservation.
function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var ret = dataR;
            $("#applicationmsg").show();
            setTimeout(function(){
                $("#applicationmsg").hide();
                $("#donatemodal").modal('hide');
            }, 3000);
            $('#adopt-animal-form')[0].reset();
            disableadopt();
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });
}

//method to update animal availability status
function disableadopt(){
    $('#adopt-btn .adopt-animal-btn').html("Reserved")
    $('#adopt-btn .adopt-animal-btn').prop("disabled", true);
    $('#adopt-btn .adopt-animal-btn').attr("data-toggle", "");
    $('#adopt-btn .adopt-animal-btn').attr("data-target", "");
}

//method to get the user comment from the animal-comment form and call the post method
function submitcomment(){
    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById('animal-comment-form');
    var formData = $(myForm).serializeArray();
    let data={};
    console.log(formData);
    sendComments('/addcomments', formData);
    return false;
}
//method to post the user comment and update the user-comments dom
function sendComments(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var ret = dataR;
            var txt = appendcomments(dataR);
            $("#user-comments-list").append(txt);
            $("#animal-comment-form")[0].reset();
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });
}
//method to construct the new comment that is posted
function appendcomments(data){
    var txt = '<div class="row cmntrow"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="text-align: center;">'
    txt += '<img style="width: 70%;" src="/images/usericon.jpg"></div>'
    txt += '<div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">'
    txt += '<div style="width:100%;">' + data.comment + '</div></div></div>'
    return txt;
}
//method to get the user comments from db through post and construct the dom for user comment list
function getComments(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var ret = dataR;
            var txt = '';
            for(var i=0; i<dataR.length;i++) {
                txt += appendcomments(dataR[i]);
            }
            $("#user-comments-list").append(txt);
            $("#animal-comment-form")[0].reset()
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });
}