"use client";

import React from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";

import { SMSTemplate } from "utils/types/init";
import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

type Payload = {
	dataItem?: SMSTemplate;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

export default function SMSTemplatePopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	const translate = useCMSTranslate();

	function onSubmit(payload, onSuccess) {
		if (dataItem) {
			payload["_id"] = dataItem["_id"];
			return Api.cms.smsTemplates.PUT({ payload, config: { onSuccess } });
		}

		Api.cms.smsTemplates.POST({ payload, config: { onSuccess } });
	}

	const formData: FormData = {
		inputs: [
			{
				name: "templateCode",
				label: translate("template_code"),
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "content",
				label: translate("sms_tmeplate_content"),
				inputType: FORM_INPUTS_TYPES.AUTO_GROW_TEXT_AREA,
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
