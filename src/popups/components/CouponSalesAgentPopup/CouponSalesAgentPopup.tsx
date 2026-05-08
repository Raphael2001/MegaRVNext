"use client";

import React from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";

import { CouponSalesAgent, SalesAgent } from "utils/types/init";

import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import { useAppSelector } from "utils/hooks/useRedux";

type Payload = {
	dataItem?: CouponSalesAgent;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

export default function CouponSalesAgentPopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	const salesAgents = useAppSelector((store) => store.init.salesAgents);
	const translate = useCMSTranslate();

	function onSubmit(payload, onSuccess) {
		if (dataItem) {
			payload["_id"] = dataItem["_id"];

			return Api.cms.couponSalesAgents.PUT({ payload, config: { onSuccess } });
		}

		Api.cms.couponSalesAgents.POST({ payload, config: { onSuccess } });
	}

	const formData: FormData = {
		inputs: [
			{
				name: "salesAgentId",
				label: translate("sales_agent"),
				inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
				options: salesAgents,
				field: "name",
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "couponCode",
				label: translate("coupon_code"),
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
		],
		initialData: dataItem,
	};

	return (
		<GeneralFormPopup
			popupIndex={popupIndex}
			hasDataItem={!!dataItem}
			onSubmit={onSubmit}
			formData={formData}
		/>
	);
}
