import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { ReactComponent as PlusIcon } from '../assets/img/plus.svg';

interface PizzaBlockProps {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
}

const PizzaBlock = ({
	id,
	title,
	price,
	imageUrl,
	sizes,
	types,
}: PizzaBlockProps) => {
	const dispatch = useDispatch();

	const count = useSelector(state =>
		state.cart.items.reduce((total, item) => {
			if (item.id === id && typeof item.count === 'number') {
				return total + item.count;
			}
			return total;
		}, 0)
	);

	const [activeType, setActiveType] = useState(types[0]);
	const [activeSize, setActiveSize] = useState(0);
	const typeNames = ['тонкое', 'традиционное'];

	const onClickButton = () => {
		const item = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[activeType],
			size: sizes[activeSize],
		};

		dispatch(addItem(item));
	};

	return (
		<div className='pizza-block'>
			<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
			<h4 className='pizza-block__title'>{title}</h4>
			<div className='pizza-block__selector'>
				<ul>
					{types.map((type, i) => (
						<li
							key={i}
							onClick={() => setActiveType(type)}
							className={activeType === type ? 'active' : ''}
						>
							{typeNames[type]}
						</li>
					))}
				</ul>
				<ul>
					{sizes.map((size, i) => (
						<li
							key={i}
							onClick={() => setActiveSize(i)}
							className={activeSize === i ? 'active' : ''}
						>
							{size} см.
						</li>
					))}
				</ul>
			</div>
			<div className='pizza-block__bottom'>
				<div className='pizza-block__price'>от {price} ₽</div>
				<button
					className='button button--outline button--add'
					onClick={onClickButton}
				>
					<PlusIcon />
					<span>Добавить</span>
					{count > 0 && <i>{count}</i>}
				</button>
			</div>
		</div>
	);
};

export default PizzaBlock;
