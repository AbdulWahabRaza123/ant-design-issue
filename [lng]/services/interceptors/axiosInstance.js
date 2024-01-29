import axios from 'axios';
import Cookies from 'js-cookie';


// Create a function to get the access token from local storage
const getAccessToken = () => {
  return Cookies.get('token');
};

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL, 
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // console.log("response" ,response);
    
    return response;
    
  },
  function (error) {
    if (error.response) {
      // console.log(error.response);
      if (error.response.status === 404) {
        // Handle 404 error
      } else if (error.response.status === 403) {
        // Handle 403 error
      } else if (error.response.status === 500) {
        // Handle 500 error
      }
    }
    // Handle other errors or rejections
    return Promise.reject(error);
  }
);

export default axiosInstance;