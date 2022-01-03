import axios from "axios";

export const token = localStorage.getItem('token');
export const user = localStorage.getItem('user');

const axiosRequest = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // timeout: 1000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }

});

const axiosOld = axios.create();

export {
    axiosRequest,
    axiosOld
};