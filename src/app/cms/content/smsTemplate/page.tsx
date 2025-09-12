"use client";

import TABLE_CELL_TYPES from "constants/TableCellType";
import POPUP_TYPES from "constants/PopupTypes";
import React from "react";

import Api from "api";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

export default function SmsTemplatesPage() {
	const smsTemplates = useAppSelector((store) => store.init.smsTemplates);

	const translate = useCMSTranslate();

	const header = {
		templateCode: {
			title: translate("template_code"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		content: {
			title: translate("sms_tmeplate_content"),
			type: TABLE_CELL_TYPES.TEXT,
		},
	};

	return (
		<PageGenerator
			data={smsTemplates}
			deleteApi={Api.cms.smsTemplates.DELETE}
			deleteTitle={translate("delete_smsTemplate")}
			header={header}
			module={CMS_MODULES.SMS_TEMPLATES}
			popup={POPUP_TYPES.SMS_TEMPLATE}
		/>
	);
}
