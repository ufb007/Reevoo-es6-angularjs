/*
  Import all Angular components via ES6 imports and register them
*/

import MainController from './controllers/MainController';
import ProductService from './services/ProductService';
import {UpperFilter, LowerFilter, UniqueFilter} from './filters/textFilters';

angular.module('angularEs6', [])
	.controller('MainController', MainController)
	.service('ProductService', ProductService)
	.filter('upper', UpperFilter)
	.filter('lower', LowerFilter)
	.filter('unique', UniqueFilter);
