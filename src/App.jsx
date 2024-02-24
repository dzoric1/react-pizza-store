import pizzas from './assets/mockDB.json';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
	return (
		<>
			<Header />
			<div className='wrapper'>
				<div className='content'>
					<div className='container'>
						<div className='content__top'>
							<Categories />
							<Sort />
						</div>
						<h2 className='content__title'>Все пиццы</h2>
						<div className='content__items'>
							{pizzas.map((elem, i) => (
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
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
