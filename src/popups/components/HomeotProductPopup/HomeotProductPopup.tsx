"use client";

import React from "react";

import FORM_INPUTS_TYPES from "constants/FormInputsTypes";

import { useAppSelector } from "utils/hooks/useRedux";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";

import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { FormData } from "utils/types/form";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import Api from "api";
import WOO_SOURCES from "constants/WooSource";
import { WooProduct } from "utils/types/products";
type Payload = {
	dataItem?: WooProduct;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

export default function HomeotProductPopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	const powerLinkProducts = useAppSelector((store) => store.init.powerLinkProducts);
	const wooProducts = useAppSelector((store) => store.init.homeotProducts);

	const translate = useCMSTranslate();

	const formData: FormData = {
		inputs: [
			{
				name: "productId",
				label: "",
				inputType: FORM_INPUTS_TYPES.SELECT,
				schema: VALIDATION_SCHEMES.NoValidation,
				options: wooProducts,
				field: "name",
				idField: "productId",
				isDisabled: true,
			},
			{
				name: "products",
				label: translate("powerlink_products"),
				inputType: FORM_INPUTS_TYPES.MULTI_SELECT_AUTO_COMPLETE,
				options: powerLinkProducts,
				schema: VALIDATION_SCHEMES.RequiredArray,
				field: "name",
				initialValue: dataItem?.plProducts,
			},
			{
				name: "quantity",
				label: translate("quantity"),
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredNumber,
				initialValue: dataItem?.plQuantity ?? 1,
			},
		],
		initialData: dataItem,
	};

	function onSubmit(formPayload, onSuccess) {
		const payload = { ...formPayload, source: WOO_SOURCES.HOMEOT };
		Api.cms.wooProducts.PUT({ payload, config: { onSuccess } });
	}

	return (
		<GeneralFormPopup
			hasDataItem={!!dataItem}
			formData={formData}
			onSubmit={onSubmit}
			popupIndex={popupIndex}
		/>
	);
}
