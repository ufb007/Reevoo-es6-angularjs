/* You could also export multiple functions (or classes) from one file. */

export function UpperFilter() {
	return function(input) {
		return input.toUpperCase();
	};
}

export function LowerFilter() {
	return function(input) {
		return input.toLowerCase();
	};
}

export function UniqueFilter() {
	return function(collection, keyname) {
		var output 	= [], 
			keys   	= [];
   
		angular.forEach(collection, function(item) {
			var key = item[keyname];
		    if(keys.indexOf(key) === -1) {
				keys.push(key);
				output.push(item);
			}
		});
   
        return output;
   };
}
