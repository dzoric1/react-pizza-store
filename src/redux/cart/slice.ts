import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const findItem = state.items.find(
				obj =>
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
			);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = calcTotalPrice(state.items);
		},
		decrementItem: (state, action) => {
			const findItem = state.items.find(
				obj =>
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
			);

			if (findItem && findItem.count > 1) {
				findItem.count--;
			}

			state.totalPrice = calcTotalPrice(state.items);
		},
		removeItem: (state, action) => {
			state.items = state.items.filter(obj => {
				if (
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
				) {
					return false;
				}

				return true;
			});

			state.totalPrice = calcTotalPrice(state.items);
		},
		clearItems: state => {
			state.totalPrice = 0;
			state.items = [];
		},
	},
});

export const { addItem, removeItem, clearItems, decrementItem } =
	cartSlice.actions;

export default cartSlice.reducer;
