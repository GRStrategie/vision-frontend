$(document).ready(perdiocDataRefresh());

function perdiocDataRefresh() {
	const url = 'http://localhost:10000/api/files';
	var dropdown = $('#myFiles');

	$.getJSON(url, function(response) {
		$.each(response.data, function(key, value) {
			dropdown.append($('<option></option>').attr('value', value).text(value));
		})
	})
	.complete(function() {
	    // schedule the next request *only* when the current one is complete:
	    setTimeout(perdiocDataRefresh, 5000);
		console.log( "Execution completed" );
	});
};

$(document).ready(function () {
	//This functions needs to be moved to a dedicated JS file as it will be used in all screens
    $("#btnSubmit").click(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        // Get form
        var form = $('#fileUploadForm')[0];

		// Create an FormData object 
        var data = new FormData(form);

		// disabled the submit button
        $("#btnSubmit").prop("disabled", true);

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
                $("#btnSubmit").prop("disabled", false);                
            },
            error: function (e) {
                console.log("ERROR : ", e);
                $("#btnSubmit").prop("disabled", false);
            }
        });
    });
});