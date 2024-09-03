"use client";

import React, { useRef } from "react";

import styles from "./MeetingTypePopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import Api from "api/requests";
import { MeetingType } from "utils/types/meetingTypes";

type Payload = {
  dataItem?: MeetingType;
};

type Props = {
  payload: Payload;
};

function MeetingTypePopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  const ref = useRef<SlidePopupRef>();

  function onSubmit(payload) {
    if (dataItem) {
      payload["id"] = dataItem["_id"];
      return Api.updateMeetingType({ payload, onSuccess });
    }

    Api.addMeetingType({ payload, onSuccess });
  }

  function onSuccess() {
    ref.current?.animateOut();
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "meetingTypeId",
        label: "סוג פגישה",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "insertText",
        label: "טקסט יצירת רשומה חדשה",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "updateText",
        label: "טקסט עדכון רשימה קיימת",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "reminderText",
        label: "טקסט לתזכורת",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
    ],
    initialData: dataItem,
  };

  return (
    <SlidePopup className={styles["meeting-type-popup"]} ref={ref}>
      <div className={styles["form"]}>
        <FormCreator
          formData={formData}
          buttonText={!dataItem ? "הוסף" : "עדכן"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default MeetingTypePopup;
