/*
 * Model class Product
 */
export default class Product {
	constructor() {
		//Check cookie if list already exists
		if (!this.readCookie()) {
			this.getProductsList();
			this.setCookie();
		}
	}

	/*
	 * Initial products list
	 */
	getProductsList() {
		this.json = [
			{
				"code"	: "FR1",
				"name"	: "Fruit tea",
				"price"	: "3.11",
				"image"	: "/libs/images/fruit-tea.jpg",
				"offer"	: "bogof",
				"qty"	: 0
			},
			{
				"code"	: "SR1",
				"name"	: "Strawberries",
				"price"	: "5.00",
				"image"	: "/libs/images/strawberries.jpg",
				"offer" : "4.50",
				"qty"	: 0
			},
			{
				"code"	: "CF1",
				"name"	: "Coffee",
				"price"	: "11.23",
				"image"	: "/libs/images/coffee.jpg",
				"offer"	: "",
				"qty"	: 0
			}
		];
	}

	readCookie() {
		var splitCookie = document.cookie.split(';');

		var jsonString = '';

		splitCookie.forEach((value)=> {
			if (value.indexOf('angular-es6-project=') >= 0) {
				jsonString = value.substr(value.indexOf('['), value.length);
			}
		});

		if (jsonString.length > 10) {
			this.json = JSON.parse(jsonString);

			return true;
		}

		return false;
	}

	setCookie(json = undefined) {
		if (json == 'object') {
			this.json = json;
		}

		document.cookie = 'angular-es6-project='+JSON.stringify(this.json);
	}

	destroyCookie() {
		document.cookie = 'angular-es6-project=';

		this.getProductsList();
	}

	get products() {
		return this.json;
	}

	/*
	 *	Calculates discounts and returns an array
	 */
	discount(list) {
		var newList = [];
		var discounts = [];

		list.forEach((value)=> {
			if (newList[value.code] === undefined) {
				newList[value.code] = [];
			}

			newList[value.code].push(value);
		});

		for (var i in newList) {
			switch (i) {
				case 'SR1':
					if (newList[i].length >= 3) {
						var subtotal 	= 0,
							offer 		= 0,
							saving 		= 0;

						newList[i].forEach((value)=> {
							subtotal += (parseFloat(value.price));
							offer += (parseFloat(value.offer));
						});

						saving = subtotal - offer;

						discounts.push({name: newList[i][0].name, saving: saving.toFixed(2)});
					}
				break;

				case 'FR1':
					if (newList[i].length > 1) {
						var count 		= newList[i].length,
							subtotal 	= 0,
							offer 		= 0,
							saving 		= 0;

						newList[i].forEach((value)=> {
							subtotal += parseFloat(value.price);
						});

						for (var a = 0; a < count; a++) {
							if (a % 2 == 1) {
								saving += parseFloat(this.json[0].price);
							}
						}

						discounts.push({name: newList[i][0].name, saving: saving.toFixed(2)});
					}
				break;
			}
		}

		return discounts;
	}
}
