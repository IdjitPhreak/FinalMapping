var Locations = (function(displayInit, initUtilities) {

	var display = null;
	var locationMode = false;
	var selectedItem = '';
	var utilities = null;
	var locationsList = null;

	function Locations(displayInit, initUtilities) {
		display = displayInit;
		utilities = initUtilities;
	}

	var radioSelection = function() {
		selectedItem = $("input[name=responseGroup]:checked").attr('id');
		locationName = $("input[name=responseGroup]:checked").attr('locationName');
		var names = locationName.split(' ');
		var city = names[0];
		var state = '';
		
				display.showDebug(selectedItem);
		$('#city').val(city);
		$('#state').val(state);
	};

	var clearResponse = function(debugMessage) {
		locationMode = false;
		display.clearResponse();
		display.showDebug(debugMessage);
	};

	Locations.prototype.testCase = function() {
		window.location.replace('/testCase');
	};

	var showLocations = function() {
		display.clearResponse();
		var count = 0;
		$(locationsList).each(function() {
			$(this).each(function() {
				this.itemName = 'item' + count++;
				display.displayRow(this);
			});
		});
	};

	Locations.prototype.getLocations = function(callback) {
		clearResponse("Get Locations called");
		locationMode = true;
		request = $.ajax({
			type : "get",
			url : '/getLocations',
			cache : false,
			dataType : "json",
			success : function(data) {
				locationsList = data;
				showLocations();
				$('#responseGroup').change(radioSelection);
				$("input[name=responseGroup]:radio:first").attr('checked', true);
				radioSelection();
				if ( typeof (callback) == 'function') {
					display.showDebug("Callback coming");
					callback();
				}
			},
			error : display.showError
		});
	};
	
	Locations.prototype.saveLocations = function() {
		var data = { details: 'locations', data: JSON.stringify(locationsList) };
		$.ajax(
		{
			type: "POST",
			url: '/saveLocations',
			dataType: "json",
			cache: 'False',
			data: data, 
			success: function(data) {
				display.showDebug(data.result);
			},
			error: display.showError			
		});	
	}


	function getNames() {
		var locations = {};
		locations.city = $.trim($('#city').val());
		locations.state = $.trim($('#state').val());
		if (!utilities.readyForUpdate(city, state)) {
			alert("Please enter a location");
			return null;
		}
		return locations;
	}


	Locations.prototype.insertLocation = function() {
		locations = getNames();
		if (locations) {
			insertRecord(locations.city, locations.state, locations.latitude, locations.longitude);
		}
	};



	var insertRecord = function(city, state, latitude, longitude) {
		var pName = city + " " + state + " " + latitude + " " +longitude ;
		display.showDebug("inserting: " + pName);
		clearResponse('called putitem');
		var location = new PHI.EasyLocation(pName, 5, 6, 7, 8);
		var query = location.toJSON();
		locationsList.push(query);
		showLocations();
	};

	Locations.prototype.deleteItem = function() {
		if (!presidentMode) {
			alert("You must select Get Locations before trying to delete a president");
			return;
		}
		clearResponse('Called delete item: ' + selectedItem);
		query = "itemName=" + selectedItem;
		utilities.deleteFromArray2(locationsList, selectedItem);			
		showLocations();	
	};

	// TODO: Get this method working so we can update an existing
	// record
	Locations.prototype.update = function() {
		if (!locationMode) {
			alert("You must select Get Location before updating.");
			return;
		}

		var names = getNames();
		if ((names) === null)
			return;

		var query = "uuid=" + selectedItem + "&city=" 
		+ names.city + '&state=' + names.state + "&longitude=" 
		+ names.longitude + "&latitude=" + names.latitude;

		request = $.ajax({
			type : "get",
			data : query,
			url : '/update',
			cache : false,
			dataType : "json",
			success : function(data) {
				display.showResponse("success");
			},
			error : display.showError
		});
	};
	
	return Locations;

})();

$(document).ready(function() {
	var locations = new Locations(new Display(), new Utilities());
	$('button:#getLocations').click(locations.getLocations);
	$('button:#insertLocation').click(locations.insertLocation);
	$('button:#saveLocations').click(locations.saveLocations);
	$('button:#update').click(locations.update);
	$('button:#deleteitem').click(locations.deleteItem);
	$('button:#testCase').click(locations.testCase);
});

