"use client";

import React from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";

import { MeetingType } from "utils/types/init";
import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

type Payload = {
	dataItem?: MeetingType;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

export default function MeetingTypePopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	const translate = useCMSTranslate();

	function onSubmit(payload, onSuccess) {
		if (dataItem) {
			payload["_id"] = dataItem["_id"];
			return Api.cms.meetingTypes.PUT({ payload, config: { onSuccess } });
		}

		Api.cms.meetingTypes.POST({ payload, config: { onSuccess } });
	}

	const formData: FormData = {
		inputs: [
			{
				name: "meetingTypeId",
				label: translate("template_code"),
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},

			{
				name: "insertText",
				label: translate("meeting_insert_text"),
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},

			{
				name: "updateText",
				label: translate("meeting_update_text"),
				inputType: FORM_INPUTS_TYPES.INPUT,
				schema: VALIDATION_SCHEMES.RequiredString,
			},

			{
				name: "reminderText",
				label: translate("meeting_reminder_text"),
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
