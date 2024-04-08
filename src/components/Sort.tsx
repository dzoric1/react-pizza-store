import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ArrowIcon } from '../assets/img/arrow-top.svg';
import { useClickOutside } from '../hooks/useClickOutside';
import { selectFilter } from '../redux/filter/selectors';
import { setSortType } from '../redux/filter/slice';
import { SortEnum, SortType } from '../redux/filter/types';

const Sort = () => {
	const [isOpen, setIsOpen] = useState(false);

	const menuRef = useRef(null);
	useClickOutside(menuRef, () => setIsOpen(false));

	const sortList: SortType[] = [
		{ name: 'популярности (↑)', sort: SortEnum.RATING_DESC },
		{ name: 'популярности (↓)', sort: SortEnum.RATING_ASC },
		{ name: 'цене (↑)', sort: SortEnum.PRICE_DESC },
		{ name: 'цене (↓)', sort: SortEnum.PRICE_ASC },
		{ name: 'алфавиту (↑)', sort: SortEnum.RATING_DESC },
		{ name: 'алфавиту (↓)', sort: SortEnum.RATING_ASC },
	];

	const { sortType } = useSelector(selectFilter);
	const dispatch = useDispatch();

	const onSelectSort = (elem: SortType) => {
		dispatch(setSortType(elem));
		setIsOpen(false);
	};

	return (
		<div className='sort' ref={menuRef}>
			<div className='sort__label' onClick={() => setIsOpen(!isOpen)}>
				<ArrowIcon />
				<b>Сортировка по:</b>
				<span>{sortType.name}</span>
			</div>
			{isOpen && (
				<div className='sort__popup'>
					<ul>
						{sortList.map((elem, i) => (
							<li
								key={i}
								className={sortType.sort === elem.sort ? 'active' : ''}
								onClick={() => onSelectSort(elem)}
							>
								{elem.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Sort;
