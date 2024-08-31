"use client";

import React, { useRef } from "react";

import styles from "./SMSTemplatePopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import Api from "api/requests";
import { SMSTemplateType } from "utils/types/smsTemplate";

type Payload = {
  dataItem?: SMSTemplateType;
};

type Props = {
  payload: Payload;
};

function SMSTemplatePopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  const ref = useRef<SlidePopupRef>();

  function onSubmit(payload) {
    if (dataItem) {
      payload["id"] = dataItem["_id"];
      return Api.updateSMSTemplate({ payload, onSuccess });
    }

    Api.addSMSTemplate({ payload, onSuccess });
  }

  function onSuccess() {
    ref.current?.animateOut();
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "templateCode",
        label: "קוד תבנית",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "content",
        label: "תוכן",
        inputType: FORM_INPUTS_TYPES.AUTO_GROW_TEXT_AREA,
        rules: ["not_empty"],
      },
    ],
    initialData: dataItem,
  };

  return (
    <SlidePopup className={styles["sms-template-popup"]} ref={ref}>
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

export default SMSTemplatePopup;
