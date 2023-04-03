import { createStore } from 'vuex'

export default createStore({
	state: {
		currency: 'BDT',
		currencySign: '৳',
		cart: [],
		cartCount: 0
	},
	mutations: {
		currencyChange(state, data) {
			state.currency = data;
			state.currencySign = data === 'BDT' ? '৳' : '$';
		},
		addToCart(state, item) {
			var found = state.cart.find(
				(product) => product.domain.name === item.domain.name
			);
			if (!found) {
				state.cart.push(item);
				state.cartCount++;
			}
		},
		removeFromCart(state, item) {
			let index = state.cart.indexOf(item);

			if (index > -1) {
				let product = state.cart[index];
				state.cartCount -= product.quantity;

				state.cart.splice(index, 1);
			}
		}
	},
	actions: {},
	modules: {}
})
