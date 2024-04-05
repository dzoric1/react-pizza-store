import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Categories = () => {
	const categoryId = useSelector(state => state.filter.categoryId);
	const dispatch = useDispatch();

	const categoriesList = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

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
