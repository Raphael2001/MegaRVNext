"use client";

import React, { useMemo } from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";

import { TaskOwnerOverride } from "utils/types/init";

import Api from "api";
import GeneralFormPopup from "components/General/GeneralFormPopup/GeneralFormPopup";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
import { useAppSelector } from "utils/hooks/useRedux";

type Payload = {
	dataItem?: TaskOwnerOverride;
};

type Props = {
	payload: Payload;
	popupIndex: number;
};

export default function TaskOwnerOverridePopup(props: Props) {
	const { payload = {}, popupIndex } = props;
	const { dataItem } = payload;

	const powerLinkUsers = useAppSelector((store) => store.init.powerLinkUsers);
	const translate = useCMSTranslate();

	const userOptions = useMemo(
		() => powerLinkUsers.map((user) => ({ ...user, _id: user.userId })),
		[powerLinkUsers],
	);

	function onSubmit(payload, onSuccess) {
		if (dataItem) {
			payload["_id"] = dataItem["_id"];
			return Api.cms.taskOwnerOverrides.PUT({ payload, config: { onSuccess } });
		}
		Api.cms.taskOwnerOverrides.POST({ payload, config: { onSuccess } });
	}

	const formData: FormData = {
		inputs: [
			{
				name: "userId",
				label: translate("user"),
				inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
				options: userOptions,
				field: "name",
				schema: VALIDATION_SCHEMES.RequiredString,
			},
			{
				name: "overrideUserId",
				label: translate("override_user"),
				inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
				options: userOptions,
				field: "name",
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
