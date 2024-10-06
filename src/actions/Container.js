
import { HttpClient } from "../Api/httpClient";




export const uploadImageFileData = (formData, uploadTo, setProgress) => {
    return HttpClient.fileUploadCustom({
        url: `${window._env_.REACT_APP_MEDIA_URL}/${uploadTo}`,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
        },
        data: formData,
        onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total))
          },
        method: "post",
    });
};


export const updateDrayagePartnerGateInFileData = (attachmentAction, attachmentType, entityId, containerNumber, shipmentId, isArchived,finalString ) => {
    let data = {};
      data = {
          eventType: "EED_ATTACHMENT",
          eventTime: Date.now(),
          eventMessage: {
              "fileName": finalString,
              "shipmentIds": shipmentId,
              "containerNumber": containerNumber,
              "entityEventID": entityId,
              "attachmentType": attachmentType,
              "isArchived": isArchived,
              "attachmentAction": attachmentAction
          }
      };
         return HttpClient.custom({
           data
    });
  };

