import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterSliceState, SortEnum } from './types';

const initialState: FilterSliceState = {
	categoryId: 0,
	currentPage: 1,
	searchValue: '',
	sortType: {
		name: 'популярности (↑)',
		sort: SortEnum.RATING_DESC,
	},
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setSortType: (state, action) => {
			state.sortType = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
	},
});

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;
