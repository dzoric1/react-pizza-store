import { TCartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: TCartItem[]) => {
	return items.reduce((sum, obj) => {
		console.log(sum);

		return obj.price * obj.count + sum;
	}, 0);
};
