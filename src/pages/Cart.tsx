import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as CartIcon } from '../assets/img/cart.svg';
import { ReactComponent as ArrowBack } from '../assets/img/grey-arrow-left.svg';
import { ReactComponent as TrashIcon } from '../assets/img/trash.svg';
import { CartEmpty } from '../components/CartEmpty';
import { CartItem } from '../components/CartItem';
import { clearItems } from '../redux/cart/slice';
import { selectCart } from '../redux/cart/selectors';

const Cart = () => {
	const dispatch = useDispatch();
	const { items, totalPrice } = useSelector(selectCart);

	const count = items.reduce((total: number, item) => {
		return total + item.count;
	}, 0);

	if (!totalPrice) {
		return <CartEmpty />;
	}

	return (
		<div className='container container--cart'>
			<div className='cart'>
				<div className='cart__top'>
					<h2 className='content__title'>
						<CartIcon />
						Корзина
					</h2>
					<div onClick={() => dispatch(clearItems())} className='cart__clear'>
						<TrashIcon />
						<span>Очистить корзину</span>
					</div>
				</div>
				<div className='content__items'>
					{items.map(item => (
						<CartItem key={`${item.id}-${item.type}-${item.size}`} {...item} />
					))}
				</div>
				<div className='cart__bottom'>
					<div className='cart__bottom-details'>
						<span>
							{' '}
							Всего пицц: <b>{count} шт.</b>{' '}
						</span>
						<span>
							{' '}
							Сумма заказа: <b>{totalPrice} ₽</b>{' '}
						</span>
					</div>
					<div className='cart__bottom-buttons'>
						<Link
							to='/'
							className='button button--outline button--add go-back-btn'
						>
							<ArrowBack />
							<span>Вернуться назад</span>
						</Link>
						<div className='button pay-btn'>
							<span>Оплатить сейчас</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
