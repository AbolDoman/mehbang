import { AxiosInstance } from "./api";

export const getAllEmployees = (callback, params="") => {
    AxiosInstance().get(`api/v1/employees${params}`)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => callback(false, err))
};
export const getAnEmployeeDetail = (callback, id, params="") => {
    AxiosInstance().get(`api/v1/employee/${id}${params}`)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => callback(false, err))
};
export const postAnEmplooyee = (callback, body, params="") => {
    AxiosInstance().post(`api/v1/create${params}`, body)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => callback(false, err))
};
export const putAnEmployee = (callback, id, body, params="") => {
    AxiosInstance().put(`api/v1/update/${id}${params}`, body)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => callback(false, err))
};
