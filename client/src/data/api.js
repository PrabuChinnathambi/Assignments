import axios from 'axios';

const apiUrl = 'https://assignmentcheck.herokuapp.com/api/';

let store = localStorage.getItem("token");

axios.interceptors.request.use(
    config => {
        config.headers.Authorization = store;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export const singleFileUpload = async (data) => {
    try {
        await axios.post(apiUrl + 'singleFile', data)
            .then(res => {
                console.log(res);
            })
    } catch (error) {
        throw error
    }
}


export const getSingleFiles = async () => {
    try {
        const { data } = await axios.get(apiUrl + 'getSingleFile');
        return data
    } catch (error) {
        throw error
    }
}