import axios from "axios";
const axiosClient = axios.create();
//URL for staging env.
axiosClient.defaults.baseURL = `http://klynkz-dev-api.azurewebsites.net/api/v1/`;

//URL for Local
//export const LocalAPIURL = `http://localhost:3001/`;

//URL for PRD
//export const PrdAPIURL = `http://localhost:3001/`;

axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;

export default axiosClient;
