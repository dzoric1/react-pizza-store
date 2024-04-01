import { useState } from 'react';
import { useDispatch, UseSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchContext from './contexts/SearchContext';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { decrement, increment } from './redux/slices/filterSlice';
import './scss/app.scss';

function App() {
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header searchValue={searchValue} setSearchValue={setSearchValue} />
				<div className='content'>
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
