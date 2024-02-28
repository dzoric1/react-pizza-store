import clearIcon from './assets/clear-icon.svg';
import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
	const onClickClear = () => {
		setSearchValue('');
	};

	return (
		<div className={styles.wrapper}>
			<input
				className={styles.input}
				type='text'
				placeholder='Поиск'
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
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
