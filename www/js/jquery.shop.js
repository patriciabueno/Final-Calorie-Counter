(function( $ ) {
	$.Shop = function( element ) {
		this.$element = $( element );
		this.init();
	};
	
	$.Shop.prototype = {
		init: function() {
		
		    // Properties
		
			this.counterPrefix = "winery-"; // Prefix string to be prepended to the counter's name in the session storage
			this.counterName = this.counterPrefix + "counter"; // counter name in the session storage
			this.total = this.counterPrefix + "total"; // Total key in the session storage
			this.storage = sessionStorage; // shortcut to the sessionStorage object
			
			
			this.$formAddTocounter = this.$element.find( "form.add-to-counter" ); // Forms for adding items to the counter
			this.$formcounter = this.$element.find( "#calorie-counter" ); // calorie counter form
			this.$checkoutcounter = this.$element.find( "#checkout-counter" ); // Checkout form counter
			this.$checkoutOrderForm = this.$element.find( "#checkout-order-form" ); // Checkout user details form
			this.$subTotal = this.$element.find( "#stotal" ); // Element that displays the subtotal charges
			this.$caloriecounterActions = this.$element.find( "#calorie-counter-actions" ); // counter actions links
			this.$updatecounterBtn = this.$caloriecounterActions.find( "#update-counter" ); // Update counter button
			this.$emptycounterBtn = this.$caloriecounterActions.find( "#empty-counter" ); // Empty counter button
			this.$userDetails = this.$element.find( "#user-details-content" ); // Element that displays the user information
			
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
			
			this.createcounter();
			this.handleAddTocounterForm();
			this.handleCheckoutOrderForm();
			this.emptycounter();
			this.updatecounter();
			this.displaycounter();
					
			
		},
		
		// Public methods
		
		// Creates the counter keys in the session storage
		
		createcounter: function() {
			if( this.storage.getItem( this.counterName ) == null ) {
			
				var counter = {};
				counter.items = [];
			
				this.storage.setItem( this.counterName, this._toJSONString( counter ) );
				this.storage.setItem( this.shippingRates, "0" );
				this.storage.setItem( this.total, "0" );
			}
		},
				
		
		// Displays the calorie counter
		
		displaycounter: function() {
			if( this.$formcounter.length ) {
				var counter = this._toJSONObject( this.storage.getItem( this.counterName ) );
				var items = counter.items;// item name returns kcals
				var $tablecounter = this.$formcounter.find( ".calorie-counter" );
				var $tablecounterBody = $tablecounter.find( "tbody" );
				
				
				for( var i = 0; i < items.length; ++i ) {
					var item = items[i];
					var product = item.product;
					var kcals =  " " + item.kcals;/* this.currency + */
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
				
				this.$subTotal[0].innerHTML =  " " + this._convertNumber( subTot );/* this.currency + */
				//this.$shipping[0].innerHTML = this.currency + " " + counterShipping;
			
			}
		},
		
		// Empties the counter by calling the _emptycounter() method
		// @see $.Shop._emptycounter()
		
		emptycounter: function() {
			var self = this;
			if( self.$emptycounterBtn.length ) {
				self.$emptycounterBtn.on( "click", function() {
					self._emptycounter();
				});
			}
		},
		
		// Updates the counter
		
		updatecounter: function() {
			var self = this;
		  if( self.$updatecounterBtn.length ) {
			self.$updatecounterBtn.on( "click", function() {
				var $rows = self.$formcounter.find( "tbody tr" );
				var counter = self.storage.getItem( self.counterName );
			//	var shippingRates = self.storage.getItem( self.shippingRates );
				var total = self.storage.getItem( self.total );
				
				var updatedTotal = 0;
				var totalQty = 0;
				var updatedcounter = {};
				updatedcounter.items = [];
				
				$rows.each(function() {
					var $row = $( this );
					var pname = $.trim( $row.find( ".pname" ).text() );
					var pqty = self._convertString( $row.find( ".pqty > .qty" ).val() );
					var pkcals = self._convertString( self._extractkcals( $row.find( ".pkcals" ) ) );
					
					var counterObj = {
						product: pname,
						kcals: pkcals,
						qty: pqty
					};
					
					updatedcounter.items.push( counterObj );
					
					var subTotal = pqty * pkcals;
					updatedTotal += subTotal;
					totalQty += pqty;
				});
				
				self.storage.setItem( self.total, self._convertNumber( updatedTotal ) );
				self.storage.setItem( self.shippingRates, self._convertNumber( self._calculateShipping( totalQty ) ) );
				self.storage.setItem( self.counterName, self._toJSONString( updatedcounter ) );
				
			});
		  }
		},
		
		// Adds items to the calorie counter
		
		handleAddTocounterForm: function() {
			var self = this;
			self.$formAddTocounter.each(function() {
				var $form = $( this );
				var $product = $form.parent();
				var kcals = self._convertString( $product.data( "kcals" ) );
				var name =  $product.data( "name" );
				
				$form.on( "submit", function() {
					var qty = self._convertString( $form.find( ".qty" ).val() );
					var subTotal = qty * kcals;
					var total = self._convertString( self.storage.getItem( self.total ) );
					var sTotal = total + subTotal;
					self.storage.setItem( self.total, sTotal );
					self._addTocounter({
						product: name,
						kcals: kcals,
						qty: qty
					});
					
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
		
		_emptycounter: function() {
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
		 * @returns kcals String the numeric string
		 */
		
		
		_extractkcals: function( element ) {
			var self = this;
			var text = element.text();
			var kcals = text.replace( self.currencyString, "" ).replace( " ", "" );
			return kcals;
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
		
		
		/* Add an object to the counter as a JSON string
		 * @param values Object the object to be added to the counter
		 * @returns void
		 */
		
		
		_addTocounter: function( values ) {
			var counter = this.storage.getItem( this.counterName );
			
			var counterObject = this._toJSONObject( counter );
			var counterCopy = counterObject;
			var items = counterCopy.items;
			items.push( values );
			
			this.storage.setItem( this.counterName, this._toJSONString( counterCopy ) );
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
		
		// As my app was made using this file as a frame, I could not delete some items that
		// are not being used, as it will compromise my own functions
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
