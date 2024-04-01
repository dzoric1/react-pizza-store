import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import SearchContext from '../contexts/SearchContext';

const Home = () => {
	const [items, setItems] = useState([]);
	const [itemsIsLoading, setItemsIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const categoryId = useSelector(state => state.filter.categoryId);
	const sortType = useSelector(state => state.filter.sortType);

	const { searchValue } = useContext(SearchContext);

	useEffect(() => {
		const order = sortType.sort.includes('-') ? 'asc' : 'desc';
		const sortBy = sortType.sort.replace('-', '');
		const category = categoryId ? `category=${categoryId}` : '';

		setItemsIsLoading(true);
		fetch(
			`https://65dc26713ea883a1529292d2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&title=${searchValue}`
		)
			.then(res => res.json())
			.then(items => {
				setItems(items);
				setItemsIsLoading(false);
			});
	}, [categoryId, sortType, searchValue, currentPage]);

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
								title={elem.title}
								price={elem.price}
								key={elem.id}
								imageUrl={elem.imageUrl}
								sizes={elem.sizes}
								types={elem.types}
							/>
					  ))}
			</div>
			<Pagination setCurrentPage={setCurrentPage} />
		</>
	);
};

export default Home;
