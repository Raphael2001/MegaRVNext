"use client";

import React, { useMemo } from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";

import { PhoneLeadSource } from "utils/types/init";

import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import { useAppSelector } from "utils/hooks/useRedux";

type Payload = {
	dataItem?: PhoneLeadSource;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

export default function PhoneLeadSourcePopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	const leadSources = useAppSelector((store) => store.init.leadSources);
	const translate = useCMSTranslate();

	// AUTO_COMPLETE stores option._id — map value → _id so the stored string is the Powerlink identifier
	const leadSourceOptions = useMemo(() => leadSources.map((ls) => ({ ...ls, _id: ls.value })), [leadSources]);

	function onSubmit(payload, onSuccess) {
		if (dataItem) {
			payload["_id"] = dataItem["_id"];

			return Api.cms.phoneLeadSources.PUT({ payload, config: { onSuccess } });
		}

		Api.cms.phoneLeadSources.POST({ payload, config: { onSuccess } });
	}

	const formData: FormData = {
		inputs: [
			{
				name: "phone",
				label: translate("phone"),
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "leadSourceValue",
				label: translate("lead_source_value"),
				inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
				options: leadSourceOptions,
				field: "title",
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
