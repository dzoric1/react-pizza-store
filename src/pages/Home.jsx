import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
	const [items, setItems] = useState([]);
	const [itemsIsLoading, setItemsIsLoading] = useState(true);

	useEffect(() => {
		fetch('https://65dc26713ea883a1529292d2.mockapi.io/items')
			.then(res => res.json())
			.then(items => {
				setItems(items);
				setItemsIsLoading(false);
			});
	}, []);

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{itemsIsLoading
					? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
					: items.map((elem, i) => (
							<PizzaBlock
								title={elem.title}
								price={elem.price}
								key={elem.id}
								imageUrl={elem.imageUrl}
								sizes={elem.sizes}
								types={elem.types}
							/>
					  ))}
				{}
			</div>
		</>
	);
};

export default Home;
