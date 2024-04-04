import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useDebounce } from '../hooks/useDebounce';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
	const dispatch = useDispatch();
	const { categoryId, sortType, currentPage, searchValue } = useSelector(
		state => state.filter
	);
	const { items, status } = useSelector(state => state.pizzas);
	const debounceSearch = useDebounce(searchValue);

	const getPizzas = async () => {
		const order = sortType.sort.includes('-') ? 'asc' : 'desc';
		const sortBy = sortType.sort.replace('-', '');
		const category = categoryId ? `category=${categoryId}` : '';

		dispatch(
			fetchPizzas({
				category,
				sortBy,
				order,
				currentPage,
				search: debounceSearch,
			})
		);
	};

	useEffect(() => {
		getPizzas();
	}, [categoryId, sortType, debounceSearch, currentPage]);

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{status === 'error' ? (
					<div className='cart cart--empty'>
						<h2>
							Пиццы не найдены <span>😕</span>
						</h2>
					</div>
				) : status === 'loading' ? (
					[...new Array(3)].map((_, i) => <Skeleton key={i} />)
				) : (
					Array.isArray(items) &&
					items.map((elem, i) => (
						<PizzaBlock
							id={elem.id}
							title={elem.title}
							price={elem.price}
							key={elem.id}
							imageUrl={elem.imageUrl}
							sizes={elem.sizes}
							types={elem.types}
						/>
					))
				)}
			</div>
			<Pagination />
		</>
	);
};

export default Home;
