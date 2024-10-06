/*************************************************************************
 *
 * KLEAREXPRESS CONFIDENTIAL
 * __________________
 *
 *  Copyright (c) 2018 - 2018 KlearExpress Corporation.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of KlearExpress Corporation and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to KlearExpress Corporation
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from KlearExpress Corporation.
 */

 import axios from "axios";
 import { get, template } from "lodash";
// import "./env-config"
 
// import { parseUrlFromProxy } from "../util";
 
 const getCookieValue = () => {
   var b = document.cookie.match("(^|;)\\s*" + "kxPartnerToken" + "\\s*=\\s*([^;]+)");
   return b ? b.pop() : "";
 };

let parseUrlFromProxy = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");
    if (!token) return;
    let domain = window.location.hostname;
    domain = domain.split(".");
    domain = `.${domain[1]}.${domain[2]}`;
    document.cookie = `kxPartnerToken=${token};domain=${domain};path=/`;
    window.location = window._env_.REACT_APP_LOGIN_URL_CUSTOMER;

    return token;
};
  
 
let noTokenValue = "_BLANK_";
const SERVERURL = 'https://api-dev.klearexpress.com/v1/events';
 
// let  tmpToken = "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.KxAe95eejj2lGRu9Bdux5bg7WFxcZlVd6ibiBt79cnQJVcfDJKC06Q.N6hkpMQzQ_1J2N3VbpGXVw.iifbwaRsfcC48CfLuPGS0aJ_fUgevzu-QwKB6tT2_7CevLCGTFRl1UWBkVdHBIklcFeTfjSFyJqi-AmRHrV3zBBGLguZ7oWlO3OUj5SIvmLrpHlQel7UnFGCPUm3-kOqHMUmA5F3vyXfGmTJaU9mSfu8CFqy-4aE-xyvZVJawEux0m1a8CnOi0BOjG8zF3Y1yKPk3TJfrovNhphkR_aXVt9LtqO6sF_Skrcg8aIvJyAi9zB5Hv2mmHGrcdcVTPvIs_4M0NRH-voSqI8qlIQB0ZGiXCBe-br2INyt3CgfCRH1aYeOAPQg8Vp9jUiWQ9_CEZT-e9T5nr0A3i-HH-pGsjAShC-qrvlnGoTnT_nQwBR7benomzR_CP0Uk_F8d4Xcb_X8oAsK2sY4FJwD6z2MwNdW3gU_muhhcb0IqNcJmS5YV8v2i4KgyxP1uIKb4gY2Y9llUAymAuu0RghTfRdT49LctMPGu5DOog4gvFGkgcZPXNP9toyf_DWt085UzVGF-BhWb2AM0dPRgtxf4Gs9cBtsGykAvonVhm6gMSFvVSC531k0enpro78AwtMwPcsxOMf6WUizq8vmpXSNEXDkCmOcLudJEJbdN7RLAxM2rdY9XN_yrgEwzurQZy4gYBOqenSNR8ZBYZixmf0KQtld6lzjjUb04uLEHopcnjUIFwF7rOhEOm3T1nz-Yw16NHyJPRQBeaQiztjwDTbE8bNcEQFX80qdJLjo7zZ2_oNDimSH8XXGqBX2fZHOkBGF-lgcjoGPdOhX0yMMvijsT7jFPg.ci5wcKiPlXGUmq8v6tT-ZQ"

 
//  let tmpToken = "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.OjSeJsHO03EgpAgnXxOVdZrpr5PRarRwTLRDZM3-TQAtz7bR04hXBA.agy4C8KEC0spoVmO6EznNw.RxnOuOkr80eZk34tZipvxkBDa9jBJCNaShdNFieGv6LQN57jDNH6-OB10X-8Rql28ByoVTo25rrG4ygQLRrm5sU8nG7dVkjm4QP2-hRZ3K0yUqtQvx18zEpxXQMZzACiyaByCx8t_OeLSXQs1HoRLGmB71ZKHLnNXnFKT6v8Doh9isZErkGz79ggCy-zEu4Hv1E_4JUmlPlJNYdh1p07GsrRL5YF1ypuqBbt9lvD71-lj3-2BNPMrH8_5a1N-Akjr6lA_BD6aBqqfMF12DEUGcJKX5Lt5hIjQiiqS1jg9ZwsmjMfGRjxV1ANlF9fmIrEedkggnQdtJwEmMdlDbz2n8I02kyQ8g1Nzm0cAb2zGVMyEAWcMmjKsM1Qa51Fveha_2kbHrWQKsOjD8oxxge3iDY2ThyF-QOQb9P19d-4OAaeH2Kuez7TUTsVfD3GfJuqOgTbiGk-zKWpZtyi_F-IWh_17P6mVh8JnNVo5EQs1lk1HueN-kK0EOvBRY0ph7HNcH9MlyRoBwaDTuFJ8O_-a-XuaWk-vBf-6iBwskzrfIcI7s9iseKntyg5YFGkcoyGlM9oAi9LBAqgPVy23go8e6f7XW4Ig4AUMIAkTBbLHSrZt0YUzoqaxqfXmt5PW2sDqpPcvFW1hxNSY-QxlFd0Zg6wqU_LX1MjtIxUCXet-IUmHlxoalVGwIzxAaYy5vTr8mbD8iWJlbexi5k8Gd8S8bTlwYMqoWdJKUYNvD5nn2qy9PcaQJcHkNbP8dy817VvF_PMXIOUDncsuSzfUHR4Uw.P4N2Md4VH-Y2mG9FRn91GQ"
  // "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.j_dozQeCS4DjbpDXfZX2TzHspknFfn7gXo9-iaF0V7B_cI1uDel8WA.4hFyVbtivQ6qFSMIGTDosw.YT3J02m4tdx_k-9OIBLqaYpgBWvmop5-nSWUeE4LHOEx9rtiPU5MupwaKYphoe8EIGqulqOkr0TGZ0Mi8aRn1rYRXBK9_1794KY0qxwSpaDz7OFcw6ydHzGg2ypmK25OpFEq2bD8sJcxYxK_SFAnxQ-NK3CZIU_OobkvghYAaDDLv_IdqiTvbEoKpJAtSf2iK3Omr34EE87EUWmtEL0RtXbAItTk4lGbwi2qIxpQoIAAvdonNBeFFA6UP6VNfnyKcQzmVVHQKIufdt0BwXcrPTDJrtLGU76-Ed0TByrmTH-lj3E7W2DaojOJ2e9TdcJQjJ9ixJuJReT5jRX5TuOk9kCos4SgJehaE4ybPZbMrIKNwBO4yJgTMTd6OdYG9Uf3s0Na22fgwtPghHEawBubEPxr5iGkH7I2o-aNoG8a4MKIMRTV5pxe3vPdEs3ZN0v9eUtD_qBXg60hNNe0YSIVB719iKa6w6wCFxk2Y9eJRQ78mojA7zgIl588HyzjTKPI88NzixwcQXlLnj8tHhjDYeiRGkMmSFzVF-iTHo5iSXE769LiZ54h3RNbSLwKLzigQd2A2WLLy8RHMs5oib_b0EcIMi4emiCqoKMTUx0TPRT2yIeBUoUs0TW6Vf5qSi6T4naGxBd1im-V6Va4-rCHZ7lQ0zaeK4cUQVCkc1e0SOhQI_y9NY6KXTXmy_sLSQAlG3Zp4Gso93veN0K9XychTYV5aDxFVs4acgH4WVYun7p9eJ5ne7G-M7Ae6k1MhWpFwCVxaJX1HA9KczF-XwKTQsG66IHPqwlM9zqN5E1CsAgIEQiXeraaZKrKA47JurwwceNekZZPjBNn1nDtFqiAJ3xYVdLuS7c9JNkhVLeSOdxkeAUotVu0LRsQaioH4WMWRdLXGQARpDRtYnNX2DCHqDoUTeDW1FrHrYyIz6IIC20fR7eRdP0ErWSv5s5-iZFxdXoJZE1EsVgBRMElb_p-h82tlEqhniWtlyX2LsdpqZ7zXBykxrZoWSjOHqSYEpOTmYz66zPNzbZDIywhSKPg26wERctNRj7yY32E6NkZ5M5ojnastKjKqhLv93nvRocSxGZ95xgffXGiKJCFD2T8zWB8GURMW28H4pQEQnNvbAg2CR5_RhY6Kyf4810H9r8vZ1wfua2FtCrN9NWDVFL7Na0s7dey70u6wlrDdmiThBLnMUrYI-4xEchfMpwFWZJ_ccE3VWAenyBkKUUiaPZTpu7Z1yyrKe71ap-1x8TA_eXhfH-r993GTMBg_KS_BZpkcvpeEHL26CP-mA4-nOEuCrpUInM9gaUBYqqb7ZB-dVB-IZCBc6KPAhD-k-tDyUhNErlM-y4blVjQqk2pKoATMN_ij4qBWMQwAoAeKiDA5uBNznG7gFGr9y1I1FeBvQpcZEsnO1_IZGwhrHxVcgAawWKyNOQ0iXN_MToE9xmVD3kApfYS6c_AL5bndDGNRyXrzaaBGonI3hj3WTvM4MzYGjYEjegg5a_zRWfTK5z-UYiWKiqNTDL_DSZqrZM2noI2ClMP-yKBAOZIjcWhzJSTRWYinUS5kM69g4jcuFHN4CA.bGpsDlGILwoRdA4_JMDJsw"
 
let tmpToken = ""
 
 axios.defaults.method = "post";
 axios.defaults.baseURL = window._env_.REACT_APP_API_URL;
 axios.defaults.headers.common["Accept"] = "application/json";
 axios.defaults.headers.common["Content-Type"] = "application/json";
 axios.defaults.headers.common["kxToken"] = getCookieValue("kxPartnerToken") || tmpToken
 // console.log("Use token : ", axios.defaults.headers.common['kxToken'])
 const baseUrl = window._env_.REACT_APP_API_URL;
 parseUrlFromProxy();
 
 // Add a response interceptor
 axios.interceptors.response.use(
   function (response) {
     // Do something with response data
     return response;
   },
   function (error) {
     // Do something with response error
     const msg = get(error, "response.data.msg", null);
     if (msg === "Expired Token" || msg === "Event not allowed without valid token" || msg === "Failed to decrypt") {
       // Send user to login URL
       window.location = window._env_.REACT_APP_LOGOUT_URL_PARTNER;
     } else {
       return Promise.reject(error);
     }
   }
 );
 
 const post = (url = "", data = "", config = {}) => {
   return axios.post(url, data, config);
 };
 
 const custom = (config = {}) => {
   axios.defaults.baseURL = window._env_.REACT_APP_API_URL;
   config.method = "post";
   axios.defaults.headers.common["Accept"] = "application/json";
   axios.defaults.headers.common["Content-Type"] = "application/json";
   axios.defaults.headers.common["kxToken"] = getCookieValue("kxPartnerToken") || tmpToken;
   // console.log("Use token : ", axios.defaults.headers.common['kxToken'])
   return axios(config);
 };
 
 const fileUploadCustom = (config = {}) => {
   axios.defaults.baseURL = window._env_.REACT_APP_MEDIA_URL;
   config.method = config.method || "post";
   axios.defaults.headers.common["Accept"] = config.headers["Accept"] || "multipart/form-data";
   axios.defaults.headers.common["Content-Type"] = config.headers["Content-Type"] || "multipart/form-data";
   axios.defaults.headers.common["kxToken"] = getCookieValue("kxPartnerToken") || tmpToken;
   // console.log("Use token : ", axios.defaults.headers.common['kxToken'])
   return axios(config);
 };

const mockCustom = (url, config = {}, timeout) => {
  config.method = "get";
  axios.defaults.baseURL = url;
  return axios(config);
};
 
 const addDoc = (config = {}) => {
   config.method = "post";
   axios.defaults.baseURL = `${window._env_.REACT_APP_API_URL}?timeout=10000`;
   return axios(config);
 };
 
 // const get = (url) => {
 //   return axios(url)
 // }
 
 const put = (url = "", data = "", config = {}) => {
   return axios.put(url, data, config);
 };
 
 const del = (url = "", config = {}) => {
   return axios.delete(url, config);
 };
 
 const HttpClient = {
   post,
    get,
   put,
   delete: del,
   custom,
   baseUrl,
   // url,
   addDoc,
   mockCustom,
   server: SERVERURL,
   fileUploadCustom,
 };
 
 export { HttpClient };
 