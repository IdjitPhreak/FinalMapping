var locations = 
{
	cgiPath: "/cgi-bin/Locations/",
	readXml: cgiPath + "LocationsXml.py",
	postXml: cgiPath + "AddingDataXml.py",

	readLocations: function()
	{
	    $("#items").empty();
	    $("#debug").empty();
	    request = $.ajax(
	    {
	        type: "GET",
	        url: readXml,
	        cache: false,
	        dataType: "xml",
	        success: function (xml) {
	            $(xml).find('location').each(function () {
	                var city = $(this).find('city').text();
	                var state = $(this).find('state').text();
	                var location = city + " " + state;
	                $("#items").append("<li>" + location + "</li>");
	            });
	        },
	        error: function(request, ajaxOptions, thrownError) {
	            showDebug("Error occurred: = " + ajaxOptions + " " + thrownError );
	            showDebug(request.status);
	            showDebug(request.statusText);
	            showDebug(request.getAllResponseHeaders());
	            showDebug(request.responseText);
	        }
	    });    
	},
	
	postLocations: function(city, state)
	{
	    $("#items").empty();
	    $("#debug").empty();
	    dataRequest = "city=" + city + "&state=" + state;
	    showDebug(dataRequest);
	    request = $.ajax(
	    {
	        type: "POST",
	        data: dataRequest,
	        url: postXml,
	        dataType: "xml",
	        success: function (xml) {
	            $(xml).find('location').each(function () {
	                var city = $(this).find('city').text();
	                var state = $(this).find('state').text();
	                var additions = city + ", " + state;
	                $("#items").append("<li>" + additions + "</li>");
	            });
	        },
	        error: function(request, ajaxOptions, thrownError) {
	            showDebug("Error occurred: = " + ajaxOptions + " " + thrownError );
	            showDebug(request.status);
	            showDebug(request.statusText);
	            showDebug(request.getAllResponseHeaders());
	            showDebug(request.responseText);
	        }
	    });
	},

	showDebug: function(textToDisplay)
	{
	    $("#debug").append('<li>' + textToDisplay + '</li>');
	}
}