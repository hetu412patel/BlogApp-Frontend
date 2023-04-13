// import axios from "axios";

// const getLocalAccessToken = () => {
//     const accessToken = localStorage.getItem("accessToken");
//     return accessToken;
// }
  
// const getLocalRefreshToken = () => {
//     const refreshToken = localStorage.getItem("refreshToken");
//     return refreshToken;
// }

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_BLOG_APP_URL,
//     headers: {
//       "Content-Type": "application/json",
//     },
// });

// instance.interceptors.request.use(
//     (config) => {
//       const token = getLocalAccessToken();
//       if (token) {
//         config.headers['Authorization']  = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );

// instance.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     async (err) => {
//       const originalConfig = err.config;
  
//       if (err.response) {
//         // Access Token was expired
//         if (err.response.status === 401 && !originalConfig._retry) {
//           originalConfig._retry = true;
  
//           try {
//             const rs = await getLocalRefreshToken();
//             const { accessToken } = rs.data;
//             window.localStorage.setItem("accessToken", accessToken);
//             instance.defaults.headers.common["x-access-token"] = accessToken;
  
//             return instance(originalConfig);
//           } catch (_error) {
//             if (_error.response && _error.response.data) {
//               return Promise.reject(_error.response.data);
//             }
  
//             return Promise.reject(_error);
//           }
//         }
  
//         if (err.response.status === 403 && err.response.data) {
//           return Promise.reject(err.response.data);
//         }
//       }
  
//       return Promise.reject(err);
//     }
//   );