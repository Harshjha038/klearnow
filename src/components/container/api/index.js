import { HttpClient } from "../../../Api/httpClient";

const statusToEnum = {
  noStatus: 'NO_STATUS',
  grounded: 'UV',
  readyForPickup: 'AV',
  gateOut: 'OA',
  gateIn: 'I',
}

const holdStatuses = {
  NO_HOLD: true,
  ON_HOLD: true,
  HOLD_REMOVED: true,
}

const feeStatuses = {
  NO_DUES: true,
  FEES_DUE: true,
  FEES_PAID: true,
}

export const getContainerStatuses = (containerIds = '') => {
  const data = {
    eventMessage: containerIds, // empty string will give all active container statuses
    eventType: "GET_CONTAINERS_STATUSES",
    eventTime: Date.now()
  };
  return HttpClient.custom({
    data
  });
};

export const getContainerList = params => {
  const data = {
    eventMessage: {
      ...params
    },
    eventType: "EED_SEARCH_ENTITY",
    eventTime: Date.now()
  };
  return HttpClient.custom({
    data
  });
};

export const getEntityTime = params => {
  const data = {
    eventMessage: {
      ...params,
    },
    eventType: "EED_SELECT_ENTITY_TIME",
    eventTime: Date.now()
  };
  return HttpClient.custom({
    data
  });
};

export const undoEntityEvent = params => {
  const data = {
    eventMessage: {
      ...params,
    },
    eventType: "UNDO_ENTITY_EVENTS",
    eventTime: Date.now()
  };
  return HttpClient.custom({
    data
  });
};

export const setContainerStatus = ({ containerNumber, status, undo = false, eventTime, eventTime2, additionalHoldInfo, fees }) => {
  const data = {
    eventMessage: {
      containerNumber,
      // status: statusToEnum[status],
    },
    eventType: 'SET_CONTAINER_STATUS',
    eventTime: Date.now()
  }
  if (!undo) {
    data.eventMessage.eventTime = eventTime
  }
  if (holdStatuses[status]) {
    data.eventMessage.holdStatus = status
    if (status === 'ON_HOLD') {
      data.eventMessage.additionalHoldInfo = additionalHoldInfo
    }
  } else if (status === 'APPOINTMENT_TIME' || status === 'AV') {
    data.eventMessage.status = status
    data.eventMessage.eventTime2 = eventTime2
  } else if (feeStatuses[status]) {
    data.eventMessage.feesStatus = status
    if (status === 'FEES_DUE') {
      data.eventMessage.fees = Math.floor(parseFloat(fees) / .01)
    }
  } else {
    data.eventMessage.status = status
  }

  return HttpClient.custom({
    data
  });
};

export const exportContainers = params => {
  const data = {
    eventMessage: {
      ...params
    },
    eventType: "EED_EXPORT_CONTAINERS",
    eventTime: Date.now()
  };
  return HttpClient.custom({
    data
  });
};

export const getCommentPerContainer = params => {
  const data = {
      eventMessage: {
        ...params,
      },
      eventType: "EED_SELECT_ENTITY_TIME",
      eventTime: Date.now()
  };
  return HttpClient.custom({
    data
  });
}

export const getVesselsPortsLvl1= function (filterParams, type) {
  const data = {
    eventType: "DRAYAGE_LEVEL1",

    eventMessage: {

      filters: filterParams,
      searchOrder: {
        "direction": "ASC",
        "searchTab": type==="port"?"SEARCH_TAB_DRAYAGE_PORT":"SEARCH_TAB_DRAYAGE_VESSEL"
      }

    },
    eventTime: Date.now()
  };
  return HttpClient.custom({
    data
  });

};

export const getVesselsLvl2= function (filterParams) {
  const data = {
    eventType: "CONTAINER_DRAYAGE_SEARCH",

    eventMessage: {
      filters: filterParams,
      "pageNumber": 1,
      searchOrder: {
        "direction": "ASC",
        "searchTab": "SEARCH_TAB_DRAYAGE_VESSEL"
      }    
    },
    eventTime: Date.now()
  };
  return HttpClient.custom({
    data
  });

};

export const getPortsLvl2= function (filterParams /*, {shipmentId, customer, port, vesselName}*/) {
  const data = {
    eventType: "CONTAINER_DRAYAGE_SEARCH",

    eventMessage: {
      filters: filterParams,
      "pageNumber": 1,
      searchOrder: {
        "direction": "ASC",
        "searchTab": "SEARCH_TAB_DRAYAGE_PORT"
      }
    },
    eventTime: Date.now()
  };
  return HttpClient.custom({
    data
  });

};


export const login = (email, password, typeOfUser) =>{
  return fetch(window._env_.REACT_APP_API_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify({
      eventMessage: {
        email: email,
        hashedPassword: password,
        typeOfUser: typeOfUser,
      },
      eventType: "KXUSER_LOGIN",
      eventTime: Date.now()
    })
  });
}

export const forgotPassword= (email) =>{
  return fetch(window._env_.REACT_APP_API_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify({
      eventMessage: {
        email: email,
        typeOfUser: window._env_.APP_NAME === "Sales" ? "SALES_USER" : "Partner" ? "DRAYAGE_PARTNER_USER" : "CUSTOMER_USER"
      },
      eventType: "RESET_PASSWORD",
      eventTime: Date.now()
    })
  });
}

export const termsOfService= (tempToken) => {
  return fetch(window._env_.REACT_APP_API_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      kxToken: tempToken
    },
    method: "post",
    body: JSON.stringify({
      eventMessage: {
        date: {
          epochs: Date.now()
        }
      },

      eventType: "GET_KXUSER_SIGNUP_DETAILS",
      eventTime: Date.now()
    })
  });
}

export const updateProfile=(tempToken, companyName, email, contactName, password, phone) =>{
  return fetch(window._env_.REACT_APP_API_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      kxToken: tempToken
    },
    method: "post",
    body: JSON.stringify({
      eventMessage: {
        userBasicInfo: {
          companyName: companyName,
          email: email,
          contactName: contactName,
          hashedPassword: password,
          additionalEmail: "",
          typeOfUser: "FREIGHT_FORWARDER",
          displayImage: ""
        },
        phone: [
          {
            typeOfPhone: "WORK",
            isdCode: "1",
            phoneNo: phone
          }
        ]
      },
      eventType: "KXUSER_UPDATE_PERSONAL_PROFILE",
      eventTime: Date.now()
    })
  });
}

export const resetPassword= (kxCommonToken, password) => {
  return fetch(window._env_.REACT_APP_API_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      kxToken: kxCommonToken 
    },
    method: "post",
    body: JSON.stringify({
      eventMessage: {
        userBasicInfo: {
          typeOfUser: window._env_.APP_NAME === "Sales" ? "SALES_USER" : "Partner" ? "DRAYAGE_PARTNER_USER" : "CUSTOMER_USER",
          hashedPassword: password
        }
      },
      eventType: "UPDATE_PASSWORD",
      eventTime: Date.now()
    })
  });
}
