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

export default function LeadAgentPage() {
	const leadAgents = useAppSelector((store) => store.init.leadAgents);
	const leadSources = useAppSelector((store) => store.init.leadSources);
	const salesAgents = useAppSelector((store) => store.init.salesAgents);

	const translate = useCMSTranslate();

	const header: TableHeader = {
		leadSourceValue: {
			title: translate("lead_source_value"),
			type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
			dataset: leadSources,
			displayField: "title",
			searchField: "value",
		},
		agentId: {
			title: translate("agent"),
			type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
			dataset: salesAgents,
			displayField: "name",
			searchField: "_id",
		},
	};

	return (
		<PageGenerator
			data={leadAgents}
			deleteApi={Api.cms.leadAgents.DELETE}
			deleteTitle={translate("delete_lead_agent")}
			header={header}
			module={CMS_MODULES.LEAD_SOURCE}
			popup={POPUP_TYPES.LEAD_AGENT}
			searchFields={["leadSourceValue", "agentId"]}
		/>
	);
}
