import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filter/selectors';
import { setSearchValue } from '../../redux/filter/slice';
import styles from './Search.module.scss';
import clearIcon from './assets/clear-icon.svg';

const Search = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const { searchValue } = useSelector(selectFilter);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		inputRef.current?.focus();
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
