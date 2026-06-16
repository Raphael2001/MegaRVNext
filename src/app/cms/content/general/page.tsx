"use client";
import React from "react";

import styles from "./general.module.scss";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import Languages from "components/Cms/Languages/Languages";

import GeneralRow from "components/Cms/GeneralRow/GeneralRow";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/PopupTypes";

import CMS_MODULES from "constants/CMSModules";
import usePermission from "utils/hooks/usePermission";
import { useAppSelector } from "utils/hooks/useRedux";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import Api from "api";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
export default function GeneralPage() {
	const generalInfo = useAppSelector((store) => store.init.generalInfo);

	const syncOptions = useAppSelector((store) => store.init.syncOptions);

	const hasSyncOptions = syncOptions && Array.isArray(syncOptions) && syncOptions.length > 0;

	const openPopup = usePopup();
	usePermission(CMS_MODULES.GENERAL_INFO);

	const translate = useCMSTranslate();

	const { onSuccessNotification } = useNotificationsHandler();

	return (
		<div className={styles["general-info-wrapper"]}>
			<Languages />

			<CmsButton
				text={translate("add_new_param")}
				className="create"
				onClick={() => openPopup(POPUP_TYPES.GENERAL_INFO)}
			/>

			{generalInfo &&
				generalInfo.map((param) => {
					return (
						<GeneralRow
							item={param}
							key={param._id}
						/>
					);
				})}

			<div className={styles["fetch-products"]}>
				<CmsButton
					text={translate("fetch_refuaVeTevaProducts")}
					className="create"
					color="blue"
					onClick={() =>
						Api.cms.refuaVeTevaProducts.PUT({
							config: { onSuccess: onSuccessNotification },
						})
					}
				/>
				<CmsButton
					text={translate("fetch_homeotProducts")}
					className="create"
					color="blue"
					onClick={() =>
						Api.cms.homeotProducts.PUT({
							config: { onSuccess: onSuccessNotification },
						})
					}
				/>

				<CmsButton
					text={translate("fetch_plProducts")}
					className="create"
					color="blue"
					onClick={() =>
						Api.cms.powerLinkProducts.PUT({
							config: { onSuccess: onSuccessNotification },
						})
					}
				/>
				<CmsButton
					text={translate("fetch_sales_agents")}
					className="create"
					color="blue"
					onClick={() =>
						Api.cms.salesAgents.PUT({
							config: { onSuccess: onSuccessNotification },
						})
					}
				/>
				<CmsButton
					text={translate("fetch_pl_users")}
					className="create"
					color="blue"
					onClick={() =>
						Api.cms.powerLinkUsers.PUT({
							config: { onSuccess: onSuccessNotification },
						})
					}
				/>
			</div>
		</div>
	);
}
