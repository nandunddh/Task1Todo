import axios from "axios";
import { BASE_URL } from "../Config/Api";

const AxiosAPI = axios.create({ baseURL: BASE_URL });

AxiosAPI.interceptors.request.use((config) => {
	config.headers["Authorization"] = `Bearer sfg-sdfsd-fsdfdsfd-sf-dsf-xsgfs`;
	return config;
});

AxiosAPI.interceptors.response.use(
	(res) => res.data,
	(error) => Promise.reject({ msg: error.response.statusText, statusCode: error.response.status })
);

export default AxiosAPI;
