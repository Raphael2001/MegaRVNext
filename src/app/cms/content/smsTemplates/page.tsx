"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function SMSTemplatesPage(props) {
  const smsTemplates = useAppSelector((store) => store.init.smsTemplates);

  const header = {
    templateCode: {
      title: "קוד תבנית",
      type: TABLE_CELL_TYPES.TEXT,
    },
    content: {
      title: "תוכן",
      type: TABLE_CELL_TYPES.TEXT,
    },
  };

  return (
    <PageGenerator
      data={smsTemplates}
      deleteApi={Api.deleteSMSTemplate}
      deleteTitle="למחוק את התבנית הזאת?"
      header={header}
      module={CMS_MODULES.SMS_TEMPLATES}
      popup={POPUP_TYPES.SMS_TEMPLATE}
    />
  );
}

export default SMSTemplatesPage;
