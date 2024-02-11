import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/employees';

export const createEmployee = (employeeData) => {
    return axios.post(REST_API_BASE_URL, employeeData);
};

export const listEmployees = () => {
    return axios.get(REST_API_BASE_URL);
};

