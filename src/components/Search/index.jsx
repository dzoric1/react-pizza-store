import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import clearIcon from './assets/clear-icon.svg';
import styles from './Search.module.scss';

const Search = () => {
	const inputRef = useRef();
	const dispatch = useDispatch();
	const { searchValue } = useSelector(state => state.filter);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		inputRef.current.focus();
	};

	return (
		<div className={styles.wrapper}>
			<input
				ref={inputRef}
				className={styles.input}
				type='text'
				placeholder='Поиск'
				value={searchValue}
				onChange={e => dispatch(setSearchValue(e.target.value))}
			/>
			{searchValue && (
				<button type='button' onClick={onClickClear} className={styles.clear}>
					<img src={clearIcon} alt='clear' />
				</button>
			)}
		</div>
	);
};

export default Search;
