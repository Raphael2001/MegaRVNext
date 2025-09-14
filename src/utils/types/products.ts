export type PowerLinkProduct = {
	_id: string;
	productId: string;
	name: string;
	price: number;
};

export type WooProduct = {
	_id: string;
	productId: string;
	name: string;
	price: number;
	plQuantity: number;
	plProducts: Array<string>;
};
