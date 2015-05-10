(function( $ ) {
	$.Shop = function( element ) {
		this.$element = $( element );
		this.init();
	};
	
	$.Shop.prototype = {
		init: function() {
		
		    // Properties
		
<<<<<<< HEAD
			this.counterPrefix = "winery-"; // Prefix string to be prepended to the counter's name in the session storage
			this.counterName = this.counterPrefix + "counter"; // counter name in the session storage
			this.shippingRates = this.counterPrefix + "shipping-rates"; // Shipping rates key in the session storage
			this.total = this.counterPrefix + "total"; // Total key in the session storage
			this.storage = sessionStorage; // shortcut to the sessionStorage object
			
			
			this.$formAddTocounter = this.$element.find( "form.add-to-counter" ); // Forms for adding items to the counter
			this.$formcounter = this.$element.find( "#calorie-counter" ); // calorie counter form
			this.$checkoutcounter = this.$element.find( "#checkout-counter" ); // Checkout form counter
			this.$checkoutOrderForm = this.$element.find( "#checkout-order-form" ); // Checkout user details form
			this.$shipping = this.$element.find( "#sshipping" ); // Element that displays the shipping rates
			this.$subTotal = this.$element.find( "#stotal" ); // Element that displays the subtotal charges
			this.$caloriecounterActions = this.$element.find( "#calorie-counter-actions" ); // counter actions links
			this.$updatecounterBtn = this.$caloriecounterActions.find( "#update-counter" ); // Update counter button
			this.$emptycounterBtn = this.$caloriecounterActions.find( "#empty-counter" ); // Empty counter button
=======
			this.cartPrefix = "winery-"; // Prefix string to be prepended to the cart's name in the session storage
			this.cartName = this.cartPrefix + "cart"; // Cart name in the session storage
			this.shippingRates = this.cartPrefix + "shipping-rates"; // Shipping rates key in the session storage
			this.total = this.cartPrefix + "total"; // Total key in the session storage
			this.storage = sessionStorage; // shortcut to the sessionStorage object
			
			
			this.$formAddToCart = this.$element.find( "form.add-to-cart" ); // Forms for adding items to the cart
			this.$formCart = this.$element.find( "#shopping-cart" ); // Shopping cart form
			this.$checkoutCart = this.$element.find( "#checkout-cart" ); // Checkout form cart
			this.$checkoutOrderForm = this.$element.find( "#checkout-order-form" ); // Checkout user details form
			this.$shipping = this.$element.find( "#sshipping" ); // Element that displays the shipping rates
			this.$subTotal = this.$element.find( "#stotal" ); // Element that displays the subtotal charges
			this.$shoppingCartActions = this.$element.find( "#shopping-cart-actions" ); // Cart actions links
			this.$updateCartBtn = this.$shoppingCartActions.find( "#update-cart" ); // Update cart button
			this.$emptyCartBtn = this.$shoppingCartActions.find( "#empty-cart" ); // Empty cart button
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
			this.$userDetails = this.$element.find( "#user-details-content" ); // Element that displays the user information
			this.$paypalForm = this.$element.find( "#paypal-form" ); // PayPal form
			
			
			this.currency = "&euro;"; // HTML entity of the currency to be displayed in the layout
			this.currencyString = "€"; // Currency symbol as textual string
			this.paypalCurrency = "EUR"; // PayPal's currency code
			this.paypalBusinessEmail = "eamon-facilitator@eamonwalsh.it"; // Your Business PayPal's account email address
			this.paypalURL = "https://www.sandbox.paypal.com/cgi-bin/webscr"; // The URL of the PayPal's form
			
			// Object containing patterns for form validation
			this.requiredFields = {
				expression: {
					value: /^([\w-\.]+)@((?:[\w]+\.)+)([a-z]){2,4}$/
				},
				
				str: {
					value: ""
				}
				
			};
			
			// Method invocation
			
<<<<<<< HEAD
			this.createcounter();
			this.handleAddTocounterForm();
			this.handleCheckoutOrderForm();
			this.emptycounter();
			this.updatecounter();
			this.displaycounter();
=======
			this.createCart();
			this.handleAddToCartForm();
			this.handleCheckoutOrderForm();
			this.emptyCart();
			this.updateCart();
			this.displayCart();
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
			this.displayUserDetails();
			this.populatePayPalForm();
			
			
		},
		
		// Public methods
		
<<<<<<< HEAD
		// Creates the counter keys in the session storage
		
		createcounter: function() {
			if( this.storage.getItem( this.counterName ) == null ) {
			
				var counter = {};
				counter.items = [];
			
				this.storage.setItem( this.counterName, this._toJSONString( counter ) );
=======
		// Creates the cart keys in the session storage
		
		createCart: function() {
			if( this.storage.getItem( this.cartName ) == null ) {
			
				var cart = {};
				cart.items = [];
			
				this.storage.setItem( this.cartName, this._toJSONString( cart ) );
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
				this.storage.setItem( this.shippingRates, "0" );
				this.storage.setItem( this.total, "0" );
			}
		},
		
		// Appends the required hidden values to the PayPal's form before submitting
		
		populatePayPalForm: function() {
			var self = this;
			if( self.$paypalForm.length ) {
				var $form = self.$paypalForm;
<<<<<<< HEAD
				var counter = self._toJSONObject( self.storage.getItem( self.counterName ) );
				var shipping = self.storage.getItem( self.shippingRates );
				var numShipping = self._convertString( shipping );
				var counterItems = counter.items; 
				var singShipping = Math.floor( numShipping / counterItems.length );
=======
				var cart = self._toJSONObject( self.storage.getItem( self.cartName ) );
				var shipping = self.storage.getItem( self.shippingRates );
				var numShipping = self._convertString( shipping );
				var cartItems = cart.items; 
				var singShipping = Math.floor( numShipping / cartItems.length );
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
				
				$form.attr( "action", self.paypalURL );
				$form.find( "input[name='business']" ).val( self.paypalBusinessEmail );
				$form.find( "input[name='currency_code']" ).val( self.paypalCurrency );
				
<<<<<<< HEAD
				for( var i = 0; i < counterItems.length; ++i ) {
					var counterItem = counterItems[i];
					var n = i + 1;
					var name = counterItem.product;
					var kcals = counterItem.kcals;
					var qty = counterItem.qty;
=======
				for( var i = 0; i < cartItems.length; ++i ) {
					var cartItem = cartItems[i];
					var n = i + 1;
					var name = cartItem.product;
					var price = cartItem.price;
					var qty = cartItem.qty;
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
					
					$( "<div/>" ).html( "<input type='hidden' name='quantity_" + n + "' value='" + qty + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='item_name_" + n + "' value='" + name + "'/>" ).
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='item_number_" + n + "' value='SKU " + name + "'/>" ).
					insertBefore( "#paypal-btn" );
<<<<<<< HEAD
					$( "<div/>" ).html( "<input type='hidden' name='amount_" + n + "' value='" + self._formatNumber( kcals, 2 ) + "'/>" ).
=======
					$( "<div/>" ).html( "<input type='hidden' name='amount_" + n + "' value='" + self._formatNumber( price, 2 ) + "'/>" ).
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
					insertBefore( "#paypal-btn" );
					$( "<div/>" ).html( "<input type='hidden' name='shipping_" + n + "' value='" + self._formatNumber( singShipping, 2 ) + "'/>" ).
					insertBefore( "#paypal-btn" );
					
				}
				
				
				
			}
		},
		
		// Displays the user's information
		
		displayUserDetails: function() {
			if( this.$userDetails.length ) {
				if( this.storage.getItem( "shipping-name" ) == null ) {
					var name = this.storage.getItem( "billing-name" );
					var email = this.storage.getItem( "billing-email" );
					var city = this.storage.getItem( "billing-city" );
					var address = this.storage.getItem( "billing-address" );
					var zip = this.storage.getItem( "billing-zip" );
					var country = this.storage.getItem( "billing-country" );
					
					var html = "<div class='detail'>";
						html += "<h2>Billing and Shipping</h2>";
						html += "<ul>";
						html += "<li>" + name + "</li>";
						html += "<li>" + email + "</li>";
						html += "<li>" + city + "</li>";
						html += "<li>" + address + "</li>";
						html += "<li>" + zip + "</li>";
						html += "<li>" + country + "</li>";
						html += "</ul></div>";
						
					this.$userDetails[0].innerHTML = html;
				} else {
					var name = this.storage.getItem( "billing-name" );
					var email = this.storage.getItem( "billing-email" );
					var city = this.storage.getItem( "billing-city" );
					var address = this.storage.getItem( "billing-address" );
					var zip = this.storage.getItem( "billing-zip" );
					var country = this.storage.getItem( "billing-country" );
					
					var sName = this.storage.getItem( "shipping-name" );
					var sEmail = this.storage.getItem( "shipping-email" );
					var sCity = this.storage.getItem( "shipping-city" );
					var sAddress = this.storage.getItem( "shipping-address" );
					var sZip = this.storage.getItem( "shipping-zip" );
					var sCountry = this.storage.getItem( "shipping-country" );
					
					var html = "<div class='detail'>";
						html += "<h2>Billing</h2>";
						html += "<ul>";
						html += "<li>" + name + "</li>";
						html += "<li>" + email + "</li>";
						html += "<li>" + city + "</li>";
						html += "<li>" + address + "</li>";
						html += "<li>" + zip + "</li>";
						html += "<li>" + country + "</li>";
						html += "</ul></div>";
						
						html += "<div class='detail right'>";
						html += "<h2>Shipping</h2>";
						html += "<ul>";
						html += "<li>" + sName + "</li>";
						html += "<li>" + sEmail + "</li>";
						html += "<li>" + sCity + "</li>";
						html += "<li>" + sAddress + "</li>";
						html += "<li>" + sZip + "</li>";
						html += "<li>" + sCountry + "</li>";
						html += "</ul></div>";
						
					this.$userDetails[0].innerHTML = html;	
				
				}
			}
		},
		
<<<<<<< HEAD
		// Displays the calorie counter
		
		displaycounter: function() {
			if( this.$formcounter.length ) {
				var counter = this._toJSONObject( this.storage.getItem( this.counterName ) );
				var items = counter.items;
				var $tablecounter = this.$formcounter.find( ".calorie-counter" );
				var $tablecounterBody = $tablecounter.find( "tbody" );
=======
		// Displays the shopping cart
		
		displayCart: function() {
			if( this.$formCart.length ) {
				var cart = this._toJSONObject( this.storage.getItem( this.cartName ) );
				var items = cart.items;
				var $tableCart = this.$formCart.find( ".shopping-cart" );
				var $tableCartBody = $tableCart.find( "tbody" );
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
				
				
				for( var i = 0; i < items.length; ++i ) {
					var item = items[i];
					var product = item.product;
<<<<<<< HEAD
					var kcals = this.currency + " " + item.kcals;
					var qty = item.qty;
					var html = "<tr><td class='pname'>" + product + "</td>" + "<td class='pqty'><input type='text' value='" + qty + "' class='qty'/></td>" + "<td class='pkcals'>" + kcals + "</td></tr>";
					
					$tablecounterBody.html( $tablecounterBody.html() + html );
				}
				
				var total = this.storage.getItem( this.total );
				this.$subTotal[0].innerHTML =  " " + total;/* this.currency + */
			} else if( this.$checkoutcounter.length ) {
				var checkoutcounter = this._toJSONObject( this.storage.getItem( this.counterName ) );
				var counterItems = checkoutcounter.items;
				var $counterBody = this.$checkoutcounter.find( "tbody" );
				
				for( var j = 0; j < counterItems.length; ++j ) {
					var counterItem = counterItems[j];
					var counterProduct = counterItem.product;
					var counterkcals =  " " + counterItem.kcals;/* this.currency + */
					var counterQty = counterItem.qty;
					var counterHTML = "<tr><td class='pname'>" + counterProduct + "</td>" + "<td class='pqty'>" + counterQty + "</td>" + "<td class='pkcals'>" + counterkcals + "</td></tr>";
					
					$counterBody.html( $counterBody.html() + counterHTML );
				}
				
				var counterTotal = this.storage.getItem( this.total );
				var counterShipping = this.storage.getItem( this.shippingRates );
				var subTot = this._convertString( counterTotal ) + this._convertString( counterShipping );
				
				this.$subTotal[0].innerHTML = this.currency + " " + this._convertNumber( subTot );
				this.$shipping[0].innerHTML = this.currency + " " + counterShipping;
=======
					var price = this.currency + " " + item.price;
					var qty = item.qty;
					var html = "<tr><td class='pname'>" + product + "</td>" + "<td class='pqty'><input type='text' value='" + qty + "' class='qty'/></td>" + "<td class='pprice'>" + price + "</td></tr>";
					
					$tableCartBody.html( $tableCartBody.html() + html );
				}
				
				var total = this.storage.getItem( this.total );
				this.$subTotal[0].innerHTML = this.currency + " " + total;
			} else if( this.$checkoutCart.length ) {
				var checkoutCart = this._toJSONObject( this.storage.getItem( this.cartName ) );
				var cartItems = checkoutCart.items;
				var $cartBody = this.$checkoutCart.find( "tbody" );
				
				for( var j = 0; j < cartItems.length; ++j ) {
					var cartItem = cartItems[j];
					var cartProduct = cartItem.product;
					var cartPrice = this.currency + " " + cartItem.price;
					var cartQty = cartItem.qty;
					var cartHTML = "<tr><td class='pname'>" + cartProduct + "</td>" + "<td class='pqty'>" + cartQty + "</td>" + "<td class='pprice'>" + cartPrice + "</td></tr>";
					
					$cartBody.html( $cartBody.html() + cartHTML );
				}
				
				var cartTotal = this.storage.getItem( this.total );
				var cartShipping = this.storage.getItem( this.shippingRates );
				var subTot = this._convertString( cartTotal ) + this._convertString( cartShipping );
				
				this.$subTotal[0].innerHTML = this.currency + " " + this._convertNumber( subTot );
				this.$shipping[0].innerHTML = this.currency + " " + cartShipping;
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
			
			}
		},
		
<<<<<<< HEAD
		// Empties the counter by calling the _emptycounter() method
		// @see $.Shop._emptycounter()
		
		emptycounter: function() {
			var self = this;
			if( self.$emptycounterBtn.length ) {
				self.$emptycounterBtn.on( "click", function() {
					self._emptycounter();
=======
		// Empties the cart by calling the _emptyCart() method
		// @see $.Shop._emptyCart()
		
		emptyCart: function() {
			var self = this;
			if( self.$emptyCartBtn.length ) {
				self.$emptyCartBtn.on( "click", function() {
					self._emptyCart();
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
				});
			}
		},
		
<<<<<<< HEAD
		// Updates the counter
		
		updatecounter: function() {
			var self = this;
		  if( self.$updatecounterBtn.length ) {
			self.$updatecounterBtn.on( "click", function() {
				var $rows = self.$formcounter.find( "tbody tr" );
				var counter = self.storage.getItem( self.counterName );
=======
		// Updates the cart
		
		updateCart: function() {
			var self = this;
		  if( self.$updateCartBtn.length ) {
			self.$updateCartBtn.on( "click", function() {
				var $rows = self.$formCart.find( "tbody tr" );
				var cart = self.storage.getItem( self.cartName );
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
				var shippingRates = self.storage.getItem( self.shippingRates );
				var total = self.storage.getItem( self.total );
				
				var updatedTotal = 0;
				var totalQty = 0;
<<<<<<< HEAD
				var updatedcounter = {};
				updatedcounter.items = [];
=======
				var updatedCart = {};
				updatedCart.items = [];
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
				
				$rows.each(function() {
					var $row = $( this );
					var pname = $.trim( $row.find( ".pname" ).text() );
					var pqty = self._convertString( $row.find( ".pqty > .qty" ).val() );
<<<<<<< HEAD
					var pkcals = self._convertString( self._extractkcals( $row.find( ".pkcals" ) ) );
					
					var counterObj = {
						product: pname,
						kcals: pkcals,
						qty: pqty
					};
					
					updatedcounter.items.push( counterObj );
					
					var subTotal = pqty * pkcals;
=======
					var pprice = self._convertString( self._extractPrice( $row.find( ".pprice" ) ) );
					
					var cartObj = {
						product: pname,
						price: pprice,
						qty: pqty
					};
					
					updatedCart.items.push( cartObj );
					
					var subTotal = pqty * pprice;
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
					updatedTotal += subTotal;
					totalQty += pqty;
				});
				
				self.storage.setItem( self.total, self._convertNumber( updatedTotal ) );
				self.storage.setItem( self.shippingRates, self._convertNumber( self._calculateShipping( totalQty ) ) );
<<<<<<< HEAD
				self.storage.setItem( self.counterName, self._toJSONString( updatedcounter ) );
=======
				self.storage.setItem( self.cartName, self._toJSONString( updatedCart ) );
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
				
			});
		  }
		},
		
<<<<<<< HEAD
		// Adds items to the calorie counter
		
		handleAddTocounterForm: function() {
			var self = this;
			self.$formAddTocounter.each(function() {
				var $form = $( this );
				var $product = $form.parent();
				var kcals = self._convertString( $product.data( "kcals" ) );
=======
		// Adds items to the shopping cart
		
		handleAddToCartForm: function() {
			var self = this;
			self.$formAddToCart.each(function() {
				var $form = $( this );
				var $product = $form.parent();
				var price = self._convertString( $product.data( "price" ) );
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
				var name =  $product.data( "name" );
				
				$form.on( "submit", function() {
					var qty = self._convertString( $form.find( ".qty" ).val() );
<<<<<<< HEAD
					var subTotal = qty * kcals;
					var total = self._convertString( self.storage.getItem( self.total ) );
					var sTotal = total + subTotal;
					self.storage.setItem( self.total, sTotal );
					self._addTocounter({
						product: name,
						kcals: kcals,
=======
					var subTotal = qty * price;
					var total = self._convertString( self.storage.getItem( self.total ) );
					var sTotal = total + subTotal;
					self.storage.setItem( self.total, sTotal );
					self._addToCart({
						product: name,
						price: price,
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
						qty: qty
					});
					var shipping = self._convertString( self.storage.getItem( self.shippingRates ) );
					var shippingRates = self._calculateShipping( qty );
					var totalShipping = shipping + shippingRates;
					
					self.storage.setItem( self.shippingRates, totalShipping );
				});
			});
		},
		
		// Handles the checkout form by adding a validation routine and saving user's info into the session storage
		
		handleCheckoutOrderForm: function() {
			var self = this;
			if( self.$checkoutOrderForm.length ) {
				var $sameAsBilling = $( "#same-as-billing" );
				$sameAsBilling.on( "change", function() {
					var $check = $( this );
					if( $check.prop( "checked" ) ) {
						$( "#fieldset-shipping" ).slideUp( "normal" );
					} else {
						$( "#fieldset-shipping" ).slideDown( "normal" );
					}
				});
				
				self.$checkoutOrderForm.on( "submit", function() {
					var $form = $( this );
					var valid = self._validateForm( $form );
					
					if( !valid ) {
						return valid;
					} else {
						self._saveFormData( $form );
					}
				});
			}
		},
		
		// Private methods
		
		
		// Empties the session storage
		
<<<<<<< HEAD
		_emptycounter: function() {
=======
		_emptyCart: function() {
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
			this.storage.clear();
		},
		
		/* Format a number by decimal places
		 * @param num Number the number to be formatted
		 * @param places Number the decimal places
		 * @returns n Number the formatted number
		 */
		 
		 
		
		_formatNumber: function( num, places ) {
			var n = num.toFixed( places );
			return n;
		},
		
		/* Extract the numeric portion from a string
		 * @param element Object the jQuery element that contains the relevant string
<<<<<<< HEAD
		 * @returns kcals String the numeric string
		 */
		
		
		_extractkcals: function( element ) {
			var self = this;
			var text = element.text();
			var kcals = text.replace( self.currencyString, "" ).replace( " ", "" );
			return kcals;
=======
		 * @returns price String the numeric string
		 */
		
		
		_extractPrice: function( element ) {
			var self = this;
			var text = element.text();
			var price = text.replace( self.currencyString, "" ).replace( " ", "" );
			return price;
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
		},
		
		/* Converts a numeric string into a number
		 * @param numStr String the numeric string to be converted
		 * @returns num Number the number
		 */
		
		_convertString: function( numStr ) {
			var num;
			if( /^[-+]?[0-9]+\.[0-9]+$/.test( numStr ) ) {
				num = parseFloat( numStr );
			} else if( /^\d+$/.test( numStr ) ) {
				num = parseInt( numStr, 10 );
			} else {
				num = Number( numStr );
			}
			
			if( !isNaN( num ) ) {
				return num;
			} else {
				console.warn( numStr + " cannot be converted into a number" );
				return false;
			}
		},
		
		/* Converts a number to a string
		 * @param n Number the number to be converted
		 * @returns str String the string returned
		 */
		
		_convertNumber: function( n ) {
			var str = n.toString();
			return str;
		},
		
		/* Converts a JSON string to a JavaScript object
		 * @param str String the JSON string
		 * @returns obj Object the JavaScript object
		 */
		
		_toJSONObject: function( str ) {
			var obj = JSON.parse( str );
			return obj;
		},
		
		/* Converts a JavaScript object to a JSON string
		 * @param obj Object the JavaScript object
		 * @returns str String the JSON string
		 */
		
		
		_toJSONString: function( obj ) {
			var str = JSON.stringify( obj );
			return str;
		},
		
		
<<<<<<< HEAD
		/* Add an object to the counter as a JSON string
		 * @param values Object the object to be added to the counter
=======
		/* Add an object to the cart as a JSON string
		 * @param values Object the object to be added to the cart
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
		 * @returns void
		 */
		
		
<<<<<<< HEAD
		_addTocounter: function( values ) {
			var counter = this.storage.getItem( this.counterName );
			
			var counterObject = this._toJSONObject( counter );
			var counterCopy = counterObject;
			var items = counterCopy.items;
			items.push( values );
			
			this.storage.setItem( this.counterName, this._toJSONString( counterCopy ) );
		},
		
		/* Custom shipping rates calculation based on the total quantity of items in the counter
=======
		_addToCart: function( values ) {
			var cart = this.storage.getItem( this.cartName );
			
			var cartObject = this._toJSONObject( cart );
			var cartCopy = cartObject;
			var items = cartCopy.items;
			items.push( values );
			
			this.storage.setItem( this.cartName, this._toJSONString( cartCopy ) );
		},
		
		/* Custom shipping rates calculation based on the total quantity of items in the cart
>>>>>>> 93541aff5f94a04699156ae48ca9498aeebabb62
		 * @param qty Number the total quantity of items
		 * @returns shipping Number the shipping rates
		 */
		
		_calculateShipping: function( qty ) {
			var shipping = 0;
			if( qty >= 6 ) {
				shipping = 10;
			}
			if( qty >= 12 && qty <= 30 ) {
				shipping = 20;	
			}
			
			if( qty >= 30 && qty <= 60 ) {
				shipping = 30;	
			}
			
			if( qty > 60 ) {
				shipping = 0;
			}
			
			return shipping;
		
		},
		
		/* Validates the checkout form
		 * @param form Object the jQuery element of the checkout form
		 * @returns valid Boolean true for success, false for failure
		 */
		 
		 
		
		_validateForm: function( form ) {
			var self = this;
			var fields = self.requiredFields;
			var $visibleSet = form.find( "fieldset:visible" );
			var valid = true;
			
			form.find( ".message" ).remove();
			
		  $visibleSet.each(function() {
			
			$( this ).find( ":input" ).each(function() {
				var $input = $( this );
				var type = $input.data( "type" );
				var msg = $input.data( "message" );
				
				if( type == "string" ) {
					if( $input.val() == fields.str.value ) {
						$( "<span class='message'/>" ).text( msg ).
						insertBefore( $input );
						
						valid = false;
					}
				} else {
					if( !fields.expression.value.test( $input.val() ) ) {
						$( "<span class='message'/>" ).text( msg ).
						insertBefore( $input );
						
						valid = false;
					}
				}
				
			});
		  });
			
			return valid;
		
		},
		
		/* Save the data entered by the user in the ckeckout form
		 * @param form Object the jQuery element of the checkout form
		 * @returns void
		 */
		
		
		_saveFormData: function( form ) {
			var self = this;
			var $visibleSet = form.find( "fieldset:visible" );
			
			$visibleSet.each(function() {
				var $set = $( this );
				if( $set.is( "#fieldset-billing" ) ) {
					var name = $( "#name", $set ).val();
					var email = $( "#email", $set ).val();
					var city = $( "#city", $set ).val();
					var address = $( "#address", $set ).val();
					var zip = $( "#zip", $set ).val();
					var country = $( "#country", $set ).val();
					
					self.storage.setItem( "billing-name", name );
					self.storage.setItem( "billing-email", email );
					self.storage.setItem( "billing-city", city );
					self.storage.setItem( "billing-address", address );
					self.storage.setItem( "billing-zip", zip );
					self.storage.setItem( "billing-country", country );
				} else {
					var sName = $( "#sname", $set ).val();
					var sEmail = $( "#semail", $set ).val();
					var sCity = $( "#scity", $set ).val();
					var sAddress = $( "#saddress", $set ).val();
					var sZip = $( "#szip", $set ).val();
					var sCountry = $( "#scountry", $set ).val();
					
					self.storage.setItem( "shipping-name", sName );
					self.storage.setItem( "shipping-email", sEmail );
					self.storage.setItem( "shipping-city", sCity );
					self.storage.setItem( "shipping-address", sAddress );
					self.storage.setItem( "shipping-zip", sZip );
					self.storage.setItem( "shipping-country", sCountry );
				
				}
			});
		}
	};
	
	$(function() {
		var shop = new $.Shop( "#site" );
	});

})( jQuery );
