import axios from "axios";

const getLocalAccessToken = () => {
    const data = JSON.parse(localStorage.getItem("Udata"));
    const accessToken = data?.token;
    return accessToken;
}
  
const getLocalRefreshToken = () => {
    const data = JSON.parse(localStorage.getItem("Udata"));
    const refreshToken = data?.refreshToken;
    console.log("refreshToken",refreshToken);
    return refreshToken;
}

const refreshToken = () => {
  console.log("gkiujhnk", getLocalRefreshToken());
  return instance.post("/users/refreshtoken",{
     refreshtoken: getLocalRefreshToken()
  })
}

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BLOG_APP_URL,
});

instance.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken();
      if (token) {
        config.headers['Authorization']  = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
  
      if (err.response) {
        if (err.response.status === 419 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          console.log("req resended");

          try {
            const rs = await refreshToken();
            const token  = rs?.data?.token;

            const userData = JSON.parse(localStorage.getItem("Udata"))
            localStorage.setItem("Udata", JSON.stringify({...userData, token}));
            instance.defaults.headers.common['Authorization']  = 'Bearer ' + token
  
            return instance(originalConfig);
          } catch (_error) {
            if (_error?.response && _error?.response?.data) {
              return Promise.reject(_error?.response?.data);
            }
  
            return Promise.reject(_error);
          }
        }
  
        if (err?.response?.status === 403 && err?.response?.data) {
          return Promise.reject(err?.response?.data);
        }
      }
  
      return Promise.reject(err);
    }
  );