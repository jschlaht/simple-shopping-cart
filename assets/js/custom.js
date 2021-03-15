$( ".add-to-cart-button" ).click(function() {
	var productName = $(this).data().name;
	var productQuantity = $(this).parents("ul").find(".js-result").val();
	var productPrice = $(this).data().price;
	var productSlug = $(this).data().slug;

	var product = { name: productName, quantity: productQuantity, slug: productSlug, price: productPrice };
	var data = JSON.stringify(product);
	localStorage.setItem(productSlug, data);
	updateBasketBar();
});

function updateBasketBar() {
	if (CheckBrowser()) {
		var i = 0;
		var totalPrice = 0;
		if (localStorage.length < 1) {
			$('#basket-items-container').remove();
			$("#basket-totals-container").before(
				$('<div>', {
					id: 'empty-cart-bar',
					class: 'text-center g-pt-40'
				}).append(
					$('<span>', {
						class: 'd-block g-color-gray-light-v1 g-font-size-30'
					}).append(
						$('<i>', {
							class: 'icon-hotel-restaurant-105 u-line-icon-pro'
						})
					)
				).append(
					$('<span>', {
						class: 'd-block g-color-text g-font-size-15',
						text: 'Your cart is currently empty'
					})
				)
			);
		} else {
			$('#empty-cart-bar').remove();
			$('#basket-items-container').remove();
			$("#basket-totals-container").before(
				$('<div>', {
					id: 'basket-items-container',
					class: 'js-scrollbar g-height-200'
				})
			);
			//for more advance feature, you can set cap on max items in the cart
			for (i = 0; i <= localStorage.length-1; i++) {
				key = localStorage.key(i);
				product = JSON.parse(localStorage.getItem(key));
				totalPrice = totalPrice + (product.quantity * product.price);
				$("#basket-items-container").append(
					$('<div>', {
						class: 'u-basket__product g-brd-none g-px-20'
					}).append(
						$('<div>', {
							class: 'row no-gutters g-pb-5'
						}).append(
							$('<div>', {
								class: 'col-4 pr-3'
							}).append(
								$('<img>', {
									class: 'img-fluid',
									src: src="assets/img/products/150x150/"+ product.slug + ".jpg",
									alt: product.name
								})
							),
							$('<div>', {
								class: 'col-8'
							}).append(
								$('<h6>', {
									class: 'g-font-weight-400 g-font-size-default',
									text: product.name
								}),
								$('<span>', {
									class: 'g-color-primary g-font-size-12',
									text: product.quantity + ' x ' + product.price + ' €'
								})
							),
							$('<button>', {
								type: 'button',
								class: 'u-basket__product-remove',
								text: 'X',
								'data-slug': product.slug
							}).on('click', function(event) {
								localStorage.removeItem($(this).data().slug);
								updateBasketBar();
							})
						)
					)
				);
			}


		}
		document.getElementById('basket-bar-number').innerHTML = localStorage.length;
		document.getElementById('basket-total').innerHTML = totalPrice + ' €';
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}

function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
		return false;
	}
}
