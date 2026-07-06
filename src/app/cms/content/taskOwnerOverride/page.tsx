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

export default function TaskOwnerOverridePage() {
	const taskOwnerOverrides = useAppSelector((store) => store.init.taskOwnerOverrides);
	const powerLinkUsers = useAppSelector((store) => store.init.powerLinkUsers);

	const translate = useCMSTranslate();

	const header: TableHeader = {
		userId: {
			title: translate("user"),
			type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
			dataset: powerLinkUsers,
			displayField: "name",
			searchField: "userId",
		},
		overrideUserId: {
			title: translate("override_user"),
			type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
			dataset: powerLinkUsers,
			displayField: "name",
			searchField: "userId",
		},
	};

	return (
		<PageGenerator
			data={taskOwnerOverrides}
			deleteApi={Api.cms.taskOwnerOverrides.DELETE}
			deleteTitle={translate("delete_task_owner_override")}
			header={header}
			module={CMS_MODULES.TASK_OWNER_OVERRIDE}
			pagination={false}
			popup={POPUP_TYPES.TASK_OWNER_OVERRIDE}
			searchFields={["userId", "overrideUserId"]}
		/>
	);
}
