$('document').ready(function() {
	runTest();
	$('#debug').append('<li>Document Ready Called</li>');
});

function TestDisplay() {
	this.debugData = [];
	this.responseData = [];
	this.rowData = [];
	thisTestDisplay = this;
}

TestDisplay.prototype.showError = function(request, ajaxOptions, thrownError) {
};

TestDisplay.prototype.clearResponse = function(request, ajaxOptions,
		thrownError) {
	this.responseData = [];
};

TestDisplay.prototype.showDebugTest = function(textToDisplay) {
	$('#debug').append('<li>' + textToDisplay + '</li>');
};

TestDisplay.prototype.showDebug = function(textToDisplay) {
	thisTestDisplay.showDebugTest(textToDisplay);
	this.debugData.push(textToDisplay);
};

TestDisplay.prototype.showResponse = function(textToDisplay) {
	this.responseData.push(textToDisplay);
};

TestDisplay.prototype.displayRow = function(row) {
	// thisTestDisplay.showDebugTest(row);
	this.rowData.push(row);
};

function runTest() {

	module('Basic');

	test("testOne", function() {
		var testDisplay = new TestDisplay();
		locations = new Locations(testDisplay);
		locations.dirName();
		len = testDisplay.debugData.length;
		ok(len = 1);
	});

	test("testDisplayRowJ", function() {
		var testDisplay = new TestDisplay();
		states = new Locations(testDisplay);
		var row = {};
		row.stateName = 'foo';
		row.abbreviation = 'bar';
		row.capital = "fo";
		row.population = 'ten';
		testDisplay.displayRow(row);
		equal(testDisplay.rowData[0].stateName, "foo",
				"call display row, check data is correct");
	});

	
	function pauseCode(ms) 
	{
		ms += new Date().getTime();
		while (new Date() < ms){}
	} 	
	
	module("dataTests", {
		setup : function() {
			testDisplay = new TestDisplay();
			locations = new Locations(testDisplay);
			testDisplay.showDebugTest("Calling deleteAll");
			locations.deleteAll();
			testDisplay.showDebugTest("Calling addListOfLocations");
			locations.addListOfLocations();
			pauseCode(500);
			ok(true, "once extra assert per test");
		},
	 	teardown: function() {
	 		pauseCode(500);
		    ok(true, "and one extra assert after each test");		    
		}
	});

	asyncTest("testTwo", function() {	
		testDisplay.showDebugTest("Test Two started");
		locations.getLocations(function() {
			testDisplay.showDebugTest("Test Two Callback");
			len = testDisplay.rowData.length;
			ok(len > 0, "Len was: " + len);
			start();
			testDisplay.showDebugTest("Test restarted");
		});
	});

	asyncTest("testForWashington", function() {
		locations.getLocations(function() {
			var result = false;
			for ( var i = 0; i < testDisplay.rowData.length; i++) {
				if (testDisplay.rowData[i].State == "Seattle") {
					result = true;
					break;
				};
			}
			ok(result, "Could not find Seattle");
			start();
		});
	});
}

function ajaxTestGood(url) {
	asyncTest("ajaxTestGood", function() {
		$('#debug').append('<li>Bar Test called</li>');
		$.ajax({
			type : "GET",
			url : url,
			dataType : "xml",
			cache : 'False',
			success : function(xml) {
				$('#debug').append('<li>Success</li>');
				ok(true, url);
				start();
			},
			error : function(request, ajaxOptions, thrownError) {
				$('#debug').append('<li>Failure</li>');
				ok(false, url);
				start();
			}
		});
	});
}
