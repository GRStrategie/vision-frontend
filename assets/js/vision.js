$(document).one('ready', function(){
	var ws = new WebSocket("ws://localhost:10000/files");
	ws.onopen = function() {
		console.log("opened websocket");
	 };
	 ws.onmessage = function (evt) { 
		 fileListRefresh(evt.data);
	 };	 
	 ws.onclose = function () { 
		 console.log("closed websocket");
	 };
});


function fileListRefresh(wsmessage) {	
	var dropdown = $('#myFiles');
	var jsonMessage = JSON.parse(wsmessage);
	dropdown.empty();	
	$.each(jsonMessage.data, function(key, value) {
		dropdown.append($('<option></option>').attr('value', value).text(value));
	})
};

/*$(document).ready(function () {
	$('input:file').on("change", function() {
	    $('input:submit').prop('disabled', !$(this).val()); 
	});
	$('#myFile').on("change", function() {
		$('input:submit').prop('disabled', !$(this).val()); 
	});
});*/

$(document).ready(function () {
    $("#btnSubmit").click(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        // Get form
        var form = $('#fileUploadForm')[0];

		// Create an FormData object 
        var data = new FormData(form);

		// disabled the submit button
        //$("#btnSubmit").prop("disabled", true);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "http://localhost:10000/api/files",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                //$("#btnSubmit").prop("disabled", true); 
                $("#file").val("");
            },
            error: function (e) {
                console.log("ERROR : ", e);
                //$("#btnSubmit").prop("disabled", true);
                $("#file").val("");
            }
        });
    });
    
    $("#deleteBtnSubmit").click(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

		// disabled the submit button
        //$("#deleteBtnSubmit").prop("disabled", true);

        $("#myFiles option:selected").each(function() {
        	console.log($(this).text());
	        $.ajax({
	            type: "GET",
	            //enctype: 'multipart/form-data',
	            url: "http://localhost:10000/api/files/delete/" + $(this).text(),
	            data: {},
	            processData: false,
	            //dataType: "jsonp",
	            cache: false,
	            timeout: 600000,
	            success: function (data) {
	                console.log("SUCCESS : ", data);
	                //$("#deleteBtnSubmit").prop("disabled", true); 
	            },
	            error: function (e) {
	                console.log("ERROR : ", e);
	                //$("#deleteBtnSubmit").prop("disabled", true);
	            }
	        });
        });
    });
});