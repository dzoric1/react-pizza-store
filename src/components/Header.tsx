import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as CartIcon } from '../assets/img/cart.svg';
import logo from '../assets/img/pizza-logo.svg';
import Search from './Search';

const Header = () => {
	const { items, totalPrice } = useSelector(state => state.cart);
	const location = useLocation();

	const count = items.reduce((total: number, item) => {
		return total + item.count;
	}, 0);

	return (
		<div className='header'>
			<div className='container'>
				<Link to='/'>
					<div className='header__logo'>
						<img width='38' src={logo} alt='Pizza logo' />
						<div>
							<h1>React Pizza</h1>
							<p>самая вкусная пицца во вселенной</p>
						</div>
					</div>
				</Link>
				{location.pathname !== '/' ? '' : <Search />}
				<div className='header__cart'>
					<Link to='/cart' className='button button--cart'>
						<span>{totalPrice} ₽</span>
						<div className='button__delimiter'></div>
						<CartIcon />
						<span>{count}</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
