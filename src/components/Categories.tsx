import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/filter/slice';
import { RootState } from '../redux/store';

const categoriesList = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories = () => {
	const categoryId = useSelector((state: RootState) => state.filter.categoryId);
	const dispatch = useDispatch();

	return (
		<div className='categories'>
			<ul>
				{categoriesList.map((elem, i) => (
					<li
						key={i}
						className={categoryId === i ? 'active' : ''}
						onClick={() => dispatch(setCategoryId(i))}
					>
						{elem}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
