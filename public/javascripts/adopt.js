//method to get query params from the search animal form
var facetedoptions= {};
function searchanimal() {
    event.preventDefault();
    event.stopImmediatePropagation();
    var myForm = document.getElementById('search-animal-form');
    var formData = $(myForm).serializeArray();
    facetedoptions = formData
    console.log(formData);
    sendAjaxQuerysearch('/search', formData);
    return false;
}
//method to post the query params and calls the method to construct the dom for the animals obtained from result
function sendAjaxQuerysearch(url, data){
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var ret = dataR;
            $("#animals-list").empty();
            if(dataR.length == 0) {
                $("#faceted-search").hide();
                $("#search-results").show();
                $(".sr-msg").show();
            }else {
                $(".sr-msg").hide();
                showsearchresults(dataR);
                $("#faceted-search").show();
                showfacetedoptions();
                $("#search-results").show();
                enablekeyup();
            }
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });
}
//method to construct the dom for the animals passed
function showsearchresults(data){
    for(var i=0; i<data.length; i++) {
        var txt = '<div class="col-sm-4 col-md-4 col-lg-3 col-xl-3 animal-block" id="'+data[i]._id+'">'
        txt += '<div class="">'
        txt += '<div class="img-curtain">'
        if(data[i].reserved != undefined && data[i].reserved)
            txt += '<div class="animalstatus">Reserved</div>'
        txt +='<img class="img-responsive animalImage" tabindex="0" qparams="oid='+data[i]._id+'&animaltype='+data[i].type+'&location='+data[i].location+'&keywords='+data[i].keywords+'" onclick="loadanimal(\''+data[i]._id+'\')" src="'+(data[i].img).replaceAll('\\','/').replace('public','')+'" alt="image of '+(data[i].name != undefined ? data[i].name : 'animal')+'"></div>'
        txt += '<ul class="list-group">'
        txt += '<li class="list-group-item"><div class="animalName" qparams="oid='+data[i]._id+'&animaltype='+data[i].type+'&location='+data[i].location+'&keywords='+data[i].keywords+'" onclick="loadanimal(\''+data[i]._id+'\')">'+(data[i].name != undefined ? data[i].name : ' ')+'</div></li>'
        txt += '<li class="list-group-item">Animal Type : <span class="semiboldText">'+data[i].type+'</span></li>'
        txt += '<li class="list-group-item">Age Group : <span class="semiboldText">'+data[i].age+'</span></li>'
        txt += '<li class="list-group-item">Gender : <span class="semiboldText">'+data[i].gender+'</span></li>'
        txt += '<li class="list-group-item">Location : <span class="semiboldText">'+data[i].location+'</span></li>'
        txt += '<li class="list-group-item">Keywords : <span class="semiboldText">'+(data[i].keywords != undefined ? data[i].keywords : ' ')+'</span></li >'
        txt += '</ul></div></div>'
        $("#animals-list").append(txt);
    }
}

function showfacetedoptions(){
    var data={};
    for (let index in facetedoptions){
        data[facetedoptions[index].name]= facetedoptions[index].value;
    }
    $("#fac-animal-type").html(data.searchanimaltype);
    $("#fac-atp-main")[0].value = data.searchanimaltype;
    $("#fac-animal-location").html(data.searchanimallocation);
    $("#fac-al-main")[0].value = data.searchanimaltype;
    $(".fc-animal-age input[type=checkbox][value='"+data.searchanimalage+"']").prop('checked', true);
    $('.fc-animal-gender input[type=checkbox][value="'+data.searchanimalgender+'"]').prop('checked', true);
    $('#faceted-search input[type=checkbox]').prop('disabled', true);
    $('#faceted-search input[type=checkbox]')
    $('#faceted-search input[type=checkbox]').change(function() {
        getanimalsforfacetoptions();
    });
}