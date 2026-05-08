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

export default function CouponSalesAgentPage() {
	const couponSalesAgents = useAppSelector((store) => store.init.couponSalesAgents);
	const salesAgents = useAppSelector((store) => store.init.salesAgents);

	const translate = useCMSTranslate();

	const header: TableHeader = {
		couponCode: {
			title: translate("coupon_code"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		salesAgentId: {
			title: translate("sales_agent"),
			type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
			dataset: salesAgents,
			displayField: "name",
		},
	};

	return (
		<PageGenerator
			data={couponSalesAgents}
			deleteApi={Api.cms.couponSalesAgents.DELETE}
			deleteTitle={translate("delete_coupon_sales_agent")}
			header={header}
			module={CMS_MODULES.COUPON_SALES_AGENT}
			popup={POPUP_TYPES.COUPON_SALES_AGENT}
			searchFields={["couponCode"]}
		/>
	);
}
