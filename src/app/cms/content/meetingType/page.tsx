"use client";

import React from "react";

import TABLE_CELL_TYPES from "constants/TableCellType";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import Api from "api";
import POPUP_TYPES from "constants/PopupTypes";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

export default function MeetingTypesPage() {
	const meetingTypes = useAppSelector((store) => store.init.meetingTypes);
	const translate = useCMSTranslate();

	const header = {
		meetingTypeId: {
			title: translate("meeting_type"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		insertText: {
			title: translate("meeting_insert_text"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		updateText: {
			title: translate("meeting_update_text"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		reminderText: {
			title: translate("meeting_reminder_text"),
			type: TABLE_CELL_TYPES.TEXT,
		},
	};

	return (
		<PageGenerator
			data={meetingTypes}
			deleteApi={Api.cms.meetingTypes.DELETE}
			deleteTitle={translate("delete_meetingType")}
			header={header}
			module={CMS_MODULES.MEETING_TYPE}
			popup={POPUP_TYPES.MEETING_TYPE}
		/>
	);
}
