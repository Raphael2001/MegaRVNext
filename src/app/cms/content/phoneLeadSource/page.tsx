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

export default function PhoneLeadSourcePage() {
	const phoneLeadSources = useAppSelector((store) => store.init.phoneLeadSources);
	const leadSources = useAppSelector((store) => store.init.leadSources);

	const translate = useCMSTranslate();

	const header: TableHeader = {
		phone: {
			title: translate("phone"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		leadSourceValue: {
			title: translate("lead_source_value"),
			type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
			dataset: leadSources,
			displayField: "title",
			searchField: "value",
		},
	};

	return (
		<PageGenerator
			data={phoneLeadSources}
			deleteApi={Api.cms.phoneLeadSources.DELETE}
			deleteTitle={translate("delete_phone_lead_source")}
			header={header}
			module={CMS_MODULES.LEAD_SOURCE}
			popup={POPUP_TYPES.PHONE_LEAD_SOURCE}
			searchFields={["phone"]}
		/>
	);
}
