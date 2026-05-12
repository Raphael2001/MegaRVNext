"use client";

import TABLE_CELL_TYPES from "constants/TableCellType";
import POPUP_TYPES from "constants/PopupTypes";
import React from "react";

import Api from "api";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import { TableHeader } from "utils/types/table";

export default function LeadSourcePage() {
	const leadSources = useAppSelector((store) => store.init.leadSources);

	const translate = useCMSTranslate();

	const header: TableHeader = {
		title: {
			title: translate("lead_source_title"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		value: {
			title: translate("lead_source_value"),
			type: TABLE_CELL_TYPES.TEXT,
		},
	};

	return (
		<PageGenerator
			data={leadSources}
			deleteApi={Api.cms.leadSources.DELETE}
			deleteTitle={translate("delete_lead_source")}
			header={header}
			module={CMS_MODULES.LEAD_SOURCE}
			popup={POPUP_TYPES.LEAD_SOURCE}
			searchFields={["title", "value"]}
		/>
	);
}
