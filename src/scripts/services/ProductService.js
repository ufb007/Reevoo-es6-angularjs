import Product from '../model/Product';

export default class PersonService {
	/*
	  The below annotation will be processes by ngAnnotate, which
	  will annotate the constructor after compiling for minification.
	*/
	
	/*@ngInject;*/
	constructor($q) {
		this._$q = $q;
	}

	getProducts() {
		return this._$q.when(new Product());
	}

	/*getProductCode() {

	}

	getProductName() {

	}

	getPrice() {

	}*/
}
