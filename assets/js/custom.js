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

//------------------------------------------------------------------------------
//change an existing key=>value in the HTML5 storage
function ModifyItem(element) {
	//check if name1 is already exists
	var row = element.parentElement.parentNode;
	//check if key exists
			if (localStorage.getItem(row.id) !=null)
			{
			  //update
				var productName = row.firstElementChild.lastChild.innerHTML;
				var productQuantity = row.firstElementChild.nextElementSibling.lastElementChild.value;
				var product = { name: productName, quantity: productQuantity };
				var data1 = JSON.stringify(product);
				localStorage.setItem(row.id,data1);
			}


	doShowAll();
}
//-------------------------------------------------------------------------
//delete an existing key=>value from the HTML5 storage
function RemoveItem(element) {
	var name = element.parentElement.parentNode.id;
	localStorage.removeItem(name);
	updateBasketBar();
}
//-------------------------------------------------------------------------------------
//restart the local storage
function ClearAll() {
	localStorage.clear();
	updateBasketBar();
}
//--------------------------------------------------------------------------------------
// dynamically populate the table with shopping list items
//below step can be done via PHP and AJAX too.
function updateBasketBar() {
	if (CheckBrowser()) {
		var key = "";
		var list = "<tr><th>Item</th><th>Value</th></tr>\n";
		var i = 0;
		if (localStorage.length < 1) {
			$("#basket-bar").append(
				"<div id=\"empty-cart-bar\" class=\"text-center g-pt-40\">\n" +
				"    <span class=\"d-block g-color-gray-light-v1 g-font-size-30\">\n" +
				"        <i class=\"icon-hotel-restaurant-105 u-line-icon-pro\"></i>\n" +
				"    </span>\n" +
				"    <span class=\"d-block g-color-text g-font-size-15\">Your cart is currently empty</span>\n" +
				"</div>"
			);
		} else {
			$("#basket-bar").append(
				$('<div>', {
					id: 'basket-items-contianer',
					class: 'js-scrollbar g-height-200'
				})
			);
			//for more advance feature, you can set cap on max items in the cart
			for (i = 0; i <= localStorage.length-1; i++) {
				key = localStorage.key(i);
				product = JSON.parse(localStorage.getItem(key));
				$("#basket-items-contianer").append(
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
									src: src="assets/products/150x150/"+ product.slug + ".jpg",
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
									text: product.quantity + 'x' + product.price + ' €'
								})
							),
							$('<button>', {
								type: 'button',
								class: 'u-basket__product-remove',
								text: 'X',
								itemkey: product.slug
							})
						)
					)
				);
			}


		}
		//bind the data to html table
		//you can use jQuery too....
		//document.getElementById('list').innerHTML = list;
		document.getElementById('basket-bar-number').innerHTML = localStorage.length;
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}

/*
 =====> Checking the browser support
 //this step may not be required as most of modern browsers do support HTML5
 */
 //below function may be redundant
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
		return false;
	}
}
//-------------------------------------------------
/*
You can extend this script by inserting data to database or adding payment processing API to shopping cart..
*/
