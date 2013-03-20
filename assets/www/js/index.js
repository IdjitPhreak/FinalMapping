locations = new Locations;

function Locations(option) {"use strict";
	this.cgiPath = "/cgi-bin/Locations/";
	this.readXml = this.cgiPath + "PresidentsXmlMySql.py";
	this.postXml = this.cgiPath + "PresidentsXmlMySql.py";
	this.deleteXml = this.cgiPath + "PresidentsXmlMySql.py";
	that = this;
	itemNameChoice = "";
	option = option;

}

Locations.prototype.readLocations = function() {"use strict";
	$("#items").empty();
	$("#debug").empty();
	request = $.ajax({
		type : "GET",
		url : this.readXml,	
		cache : false,
		dataType : "xml",
		success : function(xml) {
			var count = 0;
			$(xml).find('location').each(function() {
				var itemName = $(this).find('itemName').text();
				var city = $(this).find('city').text();
				var state = $(this).find('state').text();
				var location = itemName + " " + city + " " + state;
				that.addToList(location, itemName, count++);
			});
			$("input[name=itemGroup]:radio").click(this.radioButtonStateSelection);
		},
		error : function(request, ajaxOptions, thrownError) {
			that.showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
			that.showDebug(request.status);
			that.showDebug(request.statusText);
			that.showDebug(request.getAllResponseHeaders());
			that.showDebug(request.responseText);
		}
	});
},

Locations.prototype.insert = function()
{"use strict";
	var city = $('#city').val();
	var state = $('#state').val();
	this.postLocations(city, state);
};

Locations.prototype.postLocations = function(city, state) {"use strict";
	$("#items").empty();
	$("#debug").empty();
	dataRequest = "city=" + city + "&state=" + state;
	this.showDebug(dataRequest);
	request = $.ajax({
		type : "POST",
		data : dataRequest,
		url : this.postXml,
		dataType : "xml",
		success : function(xml) {
			$(xml).find('location').each(function() {
				var city = $(this).find('city').text();
				var state = $(this).find('state').text();
				var additions = city + " " + state;
				$("#items").append("<li>" + additions + "</li>");
			});
		}
			}
	});
	error : function(request, ajaxOptions, thrownError) {
			that.showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
			that.showDebug(request.status);
			that.showDebug(request.statusText);
			that.showDebug(request.getAllResponseHeaders());
			that.showDebug(request.responseText);
		}
	});
}

Locations.prototype.radioButtonStateSelection = function() {
	itemNameChoice = $("input[name=itemGroup]:checked").attr('itemName');
	showDebug(itemNameChoice);
}

Locations.prototype.deleteLocation = function() {
	this.showDebug("Deletion");
	itemNameChoice = $("input[name=itemGroup]:checked").attr('itemName');
	deleteRequest = "delete=" + itemNameChoice;
	request = $.ajax({
		type : "POST",	
		data : deleteRequest,
		url : this.deleteXml,
		dataType : "xml",
		success : function(xml) {
			$(xml).find('result').each(function() {
				var resultState = $(this).find('status').text();
				that.showDebug(resultState);
			});
			// readPresidents();
		},
		error : function(request, ajaxOptions, thrownError) {
			that.showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
			that.showDebug(request.status);
			that.showDebug(request.statusText);
			that.showDebug(request.getAllResponseHeaders());
			that.showDebug(request.responseText);
		}
	});
}

Locations.prototype.addToList = function(value, itemName, count) {
	patId = 'Pat0' + count;
	$("#items").append(
			"<li><input itemName='" + itemName
					+ "' type='radio' name='itemGroup' id='" + patId
					+ "'/><label id='" + patId + "' for=" + patId + ">" + value
					+ "</li>");
}

Locations.prototype.showDebug = function(textToDisplay) {
	$("#debug").append('<li>' + textToDisplay + '</li>');
}
