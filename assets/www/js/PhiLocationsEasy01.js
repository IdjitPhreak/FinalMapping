/**
 * @author ray
 */

/*global ELF:true*/

PHI.EasyLocation = (function() {

	function withValue(value) {
		var d = withValue.d || (withValue.d = {
			enumerable : false,
			writable : false,
			configurable : true,
			value : null
		});
		d.value = value;
		return d;
	}

	function Location(initName, initStart, initEnd, initBorn, initDied) {
		Object.defineProperty(this, "LocationName", withValue(initName));
		Object.defineProperty(this, "TermStart", withValue(initStart));
		Object.defineProperty(this, "TermEnd", withValue(initEnd));
		Object.defineProperty(this, "Born", withValue(initBorn));
		Object.defineProperty(this, "Died", withValue(initDied));
	}

	// Readonly, we can't init
	/*
	President.prototype.init = function(initName, initStart, initEnd, initBorn, initDied) {
		this.PresidentName = initName;
		this.TermStart = initStart;
		this.TermEnd = initEnd;
		this.Born = initBorn;
		this.Died = initDied;
	}; */

	Location.prototype.initFromJSON = function(json) {
		this.LocationName = json.city;
		this.Latitude = json.latitude;
		this.Longitude = json.longitude;
		//add moreo for locations notes, geotreasure
		//this.Born = json.born;
		//this.Died = json.died;
	};

	Location.prototype.toJSON = function() {
		return {
			city : this.LocationName,
			latitude : this.Latitude,
			longitude : this.Longitude
			//born : this.Born,
			//died : this.Died
		};
	};

	return Location;
})();
