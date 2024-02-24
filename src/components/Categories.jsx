import { useState } from 'react';

const Categories = () => {
	const [activeIndexTab, setActiveIndexTab] = useState(0);

	const categoriesList = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	const onClickCategory = i => {
		setActiveIndexTab(i);
	};

	return (
		<div className='categories'>
			<ul>
				{categoriesList.map((elem, i) => (
					<li
						key={i}
						className={activeIndexTab === i ? 'active' : ''}
						onClick={() => onClickCategory(i)}
					>
						{elem}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
