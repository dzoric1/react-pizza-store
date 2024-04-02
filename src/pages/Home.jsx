import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useDebounce } from '../hooks/useDebounce';

const Home = () => {
	const [items, setItems] = useState([]);
	const [itemsIsLoading, setItemsIsLoading] = useState(true);

	const { categoryId, sortType, currentPage, searchValue } = useSelector(
		state => state.filter
	);

	const debounceSearch = useDebounce(searchValue);

	useEffect(() => {
		const order = sortType.sort.includes('-') ? 'asc' : 'desc';
		const sortBy = sortType.sort.replace('-', '');
		const category = categoryId ? `category=${categoryId}` : '';

		setItemsIsLoading(true);

		axios
			.get(
				`https://65dc26713ea883a1529292d2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&title=${debounceSearch}`
			)
			.then(res => {
				setItems(res.data);
				setItemsIsLoading(false);
			})
			.catch(error => console.log(error));
	}, [categoryId, sortType, debounceSearch, currentPage]);

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{itemsIsLoading
					? [...new Array(3)].map((_, i) => <Skeleton key={i} />)
					: Array.isArray(items) &&
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
					  ))}
			</div>
			<Pagination />
		</>
	);
};

export default Home;
