//Should go to common lib
let timeoutPromise = async (ms, promise) => {
    if (!promise) return Promise.resolve(null);
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        resolve(null);
      }, ms);
    });
  
    // Returns a race between our timeout and the passed in promise
    return Promise.race([promise, timeout]);
};

export const cookieNames = {
  KxCommon: 'kxPartnerToken'
}

export const getCookie = (cname) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
          c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
};

export {
    timeoutPromise,
}