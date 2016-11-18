export default class MainController {
	/*@ngInject;*/
	constructor(ProductService, $scope, $timeout, $interval, $http) {
		this.$scope 		= $scope;
		this.$http 			= $http;

		$scope.basketItems 	= [];
		$scope.subtotal 	= 0.0;
		$scope.totalPrice 	= 0.0;
		$scope.savings 		= [];
		$scope.alertSuccess	= false;
	
		//Get products from file or cookie
		ProductService.getProducts().then(product => {
			$scope.products = product.products;

			this.product = product;

			this.calculateSubtotal();

			$scope.products.forEach((value)=> {
				if (value.qty > 0) {
					for (var i = 0; i < value.qty; i++) {
						$scope.basketItems.push(value);
					}
				}
			});
		});

		/*
		 * Add quantity to products array and add the product to basket
		 * and calculate subtotal and total overall price
		 */
		$scope.addQuantity = (type, index)=> {
			var product = $scope.products[index];

			switch (type) {
				case 'plus':
					product.qty += 1;

					$scope.basketItems.push(product);
				break;

				case 'minus':
					if (product.qty > 0) {
						product.qty -= 1;
						
						var itemToDelete = false;

						$scope.basketItems.forEach((value, index)=> {
							if (value.code == product.code) {
								if (!itemToDelete) {
									$scope.basketItems.splice(index, 1);

									itemToDelete = true;
								}
							}
						});
					}
				break;
			}

			$scope.subtotal = 0;

			this.calculateSubtotal();

			this.product.setCookie($scope.products);
		};

		/*
		 * Open basket details and calculate prices
		 */
		$scope.openBasket = ()=> {
			//Calculate discounts from product model
			$scope.savings = this.product.discount($scope.basketItems);

			var totalSavings = 0;

			$scope.totalPrice = $scope.subtotal;

			$scope.savings.forEach((value)=> {
				$scope.totalPrice -= parseFloat(value.saving);
			});

			$scope.totalPrice = $scope.totalPrice.toFixed(2);
		};

		$scope.payAction = ()=> {
			if ($scope.totalPrice > 0) {
				//Reset cookie and prices
				this.product.destroyCookie();

				$scope.products = this.product.products;

				$scope.basketItems = [];
				$scope.subtotal = 0.0;
				$scope.totalPrice = 0.0;
				$scope.discount = [];

				$scope.alertSuccess = true;
			}
		};

		this.calculateSubtotal = ()=> {
			$scope.products.forEach((value, index)=> {
				if (value.qty > 0) {
					$scope.subtotal += (parseFloat(value.price) * value.qty);
				}
			});

			$scope.subtotal = $scope.subtotal.toFixed(2);
		};
	}
}
