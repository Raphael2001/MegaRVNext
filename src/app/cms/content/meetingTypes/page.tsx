"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function MeetingTypesPage(props) {
  const meetingTypes = useAppSelector((store) => store.init.meetingTypes);

  const header = {
    meetingTypeId: {
      title: "סוג פגישה",
      type: TABLE_CELL_TYPES.TEXT,
    },
    insertText: {
      title: "טקסט יצירת רשומה חדשה",
      type: TABLE_CELL_TYPES.TEXT,
    },
    updateText: {
      title: "טקסט עדכון רשימה קיימת",
      type: TABLE_CELL_TYPES.TEXT,
    },
    reminderText: {
      title: "טקסט לתזכורת",
      type: TABLE_CELL_TYPES.TEXT,
    },
  };

  return (
    <PageGenerator
      data={meetingTypes}
      deleteApi={Api.deleteMeetingType}
      deleteTitle="למחוק את סוג פגישה הזה?"
      header={header}
      module={CMS_MODULES.MEETING_TYPE}
      popup={POPUP_TYPES.MEETING_TYPE}
    />
  );
}

export default MeetingTypesPage;
