import { useContext, useEffect, useState } from 'react';
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
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: 'популярности (↑)',
		sort: 'rating',
	});

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

	// const pizzasFilter = (arr, value) => {
	// 	const filteredArr = arr.filter(name => {
	// 		return name.title.toLowerCase().includes(value.toLowerCase());
	// 	});

	// 	return filteredArr;
	// };

	// const filteredPizzas = pizzasFilter(items, searchValue);

	return (
		<>
			<div className='content__top'>
				<Categories
					categoryId={categoryId}
					onClickCategory={value => setCategoryId(value)}
				/>
				<Sort
					sortType={sortType}
					onClickSortType={value => setSortType(value)}
				/>
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
