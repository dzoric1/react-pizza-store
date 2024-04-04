import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus',
	async ({ category, sortBy, order, search, currentPage }) => {
		const { data } = await axios.get(
			`https://65dc26713ea883a1529292d2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&title=${search}`
		);
		return data;
	}
);

const initialState = {
	items: [],
	status: 'loading',
};

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.status = 'loading';
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		});
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = 'error';
			state.items = [];
		});
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
