const Categories = ({ categoryId, onClickCategory }) => {
	const categoriesList = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	return (
		<div className='categories'>
			<ul>
				{categoriesList.map((elem, i) => (
					<li
						key={i}
						className={categoryId === i ? 'active' : ''}
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
