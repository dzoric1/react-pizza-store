import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ArrowIcon } from '../assets/img/arrow-top.svg';
import { useClickOutside } from '../hooks/useClickOutside';
import { setSortType } from '../redux/slices/filterSlice';

type SortItem = {
	name: string;
	sort: string;
};

const Sort = () => {
	const [isOpen, setIsOpen] = useState(false);

	const menuRef = useRef(null);
	useClickOutside(menuRef, () => setIsOpen(false));

	const sortList: SortItem[] = [
		{ name: 'популярности (↑)', sort: 'rating' },
		{ name: 'популярности (↓)', sort: '-rating' },
		{ name: 'цене (↑)', sort: 'price' },
		{ name: 'цене (↓)', sort: '-price' },
		{ name: 'алфавиту (↑)', sort: 'title' },
		{ name: 'алфавиту (↓)', sort: '-title' },
	];

	const sortType = useSelector(state => state.filter.sortType);
	const dispatch = useDispatch();

	const onSelectSort = (elem: SortItem) => {
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
