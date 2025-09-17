"use client";

import PageGenerator from "components/Cms/PageGenerator/PageGenerator";
import CMS_MODULES from "constants/CMSModules";
import POPUP_TYPES from "constants/PopupTypes";
import TABLE_CELL_TYPES from "constants/TableCellType";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import usePermission from "utils/hooks/usePermission";
import { useAppSelector } from "utils/hooks/useRedux";
import { TableHeader } from "utils/types/table";

export default function HomeotProductsPage() {
	usePermission(CMS_MODULES.PRODUCT);
	const wooProducts = useAppSelector((store) => store.init.homeotProducts);
	const powerLinkProducts = useAppSelector((store) => store.init.powerLinkProducts);

	const translate = useCMSTranslate();

	const header: TableHeader = {
		name: {
			title: translate("product_name"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		plQuantity: {
			title: translate("quantity"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		plProducts: {
			title: translate("powerlink_products"),
			type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
			dataset: powerLinkProducts,
			displayField: "name",
		},
	};

	return (
		<PageGenerator
			data={wooProducts}
			header={header}
			showDeleteAction={false}
			module={CMS_MODULES.PRODUCT}
			popup={POPUP_TYPES.HOMEOT_PRODUCT}
			searchFields={["name"]}
			numberOfResults={10}
		/>
	);
}
