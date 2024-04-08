import { useDispatch } from 'react-redux';
import { ReactComponent as Icon } from '../assets/img/plus.svg';
import { addItem, decrementItem, removeItem } from '../redux/cart/slice';
import { TCartItem } from '../redux/cart/types';

export const CartItem = (item: TCartItem) => {
	const dispatch = useDispatch();
	const { id, title, type, size, price, count, imageUrl } = item;

	return (
		<div className='cart__item'>
			<div className='cart__item-img'>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
			</div>
			<div className='cart__item-info'>
				<h3>{title}</h3>
				<p>
					{type}, {size} см.
				</p>
			</div>
			<div className='cart__item-count'>
				<button
					disabled={count === 1}
					onClick={() => dispatch(decrementItem(item))}
					className='button button--outline button--circle cart__item-count-minus'
				>
					<Icon />
				</button>
				<b>{count}</b>
				<button
					onClick={() => dispatch(addItem(item))}
					className='button button--outline button--circle cart__item-count-plus'
				>
					<Icon />
				</button>
			</div>
			<div className='cart__item-price'>
				<b>{price * count} ₽</b>
			</div>
			<div className='cart__item-remove'>
				<div
					onClick={() => dispatch(removeItem(item))}
					className='button button--outline button--circle'
				>
					<Icon />
				</div>
			</div>
		</div>
	);
};
